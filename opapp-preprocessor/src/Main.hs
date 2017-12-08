import qualified Data.Text    as T
import qualified Data.Text.IO as T

import           System.Directory
import           System.Environment
import           System.Exit
import           System.FilePath
import           System.IO

data TextStream
  = EndOfStream
  | ConsStream T.Text (IO TextStream)

fromText :: T.Text -> TextStream
fromText txt = ConsStream txt (return EndOfStream)

concatTextStreams :: IO TextStream -> IO TextStream -> IO TextStream
concatTextStreams f g = do
  stream <- f
  case stream of
    EndOfStream -> g
    ConsStream txt h ->
      return $ ConsStream txt $ concatTextStreams h g

writeStream :: FilePath -> TextStream -> IO ()
writeStream path stream =
    withFile path WriteMode $ \handle -> go handle stream
  where
    go :: Handle -> TextStream -> IO ()
    go _ EndOfStream = return ()
    go handle (ConsStream txt f) = do
      T.hPutStr handle txt
      f >>= go handle

readVersion :: FilePath -> FilePath -> IO T.Text
readVersion base name = do
  let path = base </> name </> "VERSION"
  check <- doesFileExist path
  if check
    then do
      contents <- T.readFile path
      return $ T.strip contents
    else return "1.0"

preprocess :: (T.Text -> [T.Text] -> IO TextStream) -> T.Text -> IO TextStream
preprocess _ "" = return EndOfStream
preprocess f txt = do
  let prefix = "__opapp_"
      prefixlen = T.length prefix
      (before, after) = fmap (T.drop prefixlen) $ T.breakOn prefix txt
  if T.null after
    then return $ fromText before
    else do
      let (func, rest) = fmap (T.drop 1) $ T.break (=='(') after
          (lst, rest') = fmap (T.drop 1) $ T.break (==')') rest
          args = case map T.strip $ T.splitOn "," lst of {[""] -> []; as -> as}
      concatTextStreams
        (concatTextStreams (return (fromText before)) (f func args))
        (preprocess f rest')

transformFile :: (T.Text -> IO TextStream)
              -> FilePath -> FilePath -> IO ()
transformFile f source destination = do
    input  <- T.readFile source
    stream <- f input
    writeStream destination stream

preprocessFile :: (T.Text -> [T.Text] -> IO TextStream) -> FilePath
               -> FilePath -> IO ()
preprocessFile handleFunc = transformFile (preprocess handleFunc)

buildHandleFunc :: FilePath -> FilePath -> T.Text
                -> T.Text -> [T.Text] -> IO TextStream
buildHandleFunc base name version func args = case (func, args) of
  ("version", []) -> return $ fromText version
  ("identifier", []) -> return $ fromText $ T.pack name
  ("include", [path]) -> do
    contents <- T.readFile $ base </> name </> T.unpack path
    preprocess (buildHandleFunc base name version) contents
  ("include_as_js_string", [path]) -> do
    contents <- readFile $ base </> name </> T.unpack path
    return $ fromText $ T.pack $ show contents
  _ -> error $ "unknown function __opapp_" ++ T.unpack func
               ++ " or wrong number of arguments (received "
               ++ show (length args) ++ ")"

main :: IO ()
main = do
  args <- getArgs
  (base, name) <- case args of
    [n, b] -> return (b, n)
    [n] -> return (".", n)
    _ -> do
      hPutStrLn stderr
                "Usage: opapp-preprocessor MODULE_IDENTIFIER [BASE_DIRECTORY]"
      exitFailure

  version <- readVersion base name
  let handleFunc = buildHandleFunc base name version

  let source      = base </> name </> "base.opapp"
      destination = base </> name ++ "-" ++ T.unpack version <.> "opapp"
  preprocessFile handleFunc source destination

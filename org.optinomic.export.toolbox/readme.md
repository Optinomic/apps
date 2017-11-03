
# Optinomic Export-Toolbox.

Easy export of survey responses with calculation values.


## Definitions - Example

```JS
d.bscl = {
    "options": {
        "app_id": "org.optinomic.export.toolbox",
        "calculation_id": "bscl_full",
        "name": "BSCL",
        "delimitter": ";"
    },
    "fields": [
        { "name": "bscl_paranoides_denken_scale_score", "path": "calculation.all_results.paranoides_denken_scale_score", "type": "number" },
        { "name": "bscl_paranoides_denken_sum_score", "path": "calculation.all_results.paranoides_denken_sum_score", "type": "number" },
        { "name": "bscl_paranoides_denken_sum_score", "path": "calculation.all_results.paranoides_denken_sum_score", "type": "number" }
    ]
};
```

### Fields
#### Name
Define the `name` of the filed.

#### Path
The path to the value is defined in  `path`. Based from the `survey_responses` Array.

#### Data-Types
The following data types (`type`) are supportet:

- number
- string
- boolean
- date


# Anschrift

![image](http://www.ottiger.org/optinomic_logo/optinomic_logo_small.png)     

*Optinomic GmbH*   
*Haldenstrasse 7*     
*CH - 8942 Oberrieden*     
*+41(0)44 508 26 76*    
*info@optinomic.com*   
*[www.optinomic.com](http://www.optinomic.com)*   


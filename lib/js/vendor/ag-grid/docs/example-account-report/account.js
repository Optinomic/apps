var fileBrowserModule = angular.module('account', ['agGrid']);

fileBrowserModule.controller('accountController', function($scope) {

    var columnDefs = [
        {headerName: '', field: 'item', width: 200, cellRenderer: {
            renderer: 'group'
        }},
        {headerName: "Units", field: "category", rowGroupIndex: 0, hide: true},
        {
            headerName: 'Week 1',
            children: [
                {headerName: "Units", field: "amount1", width: 70, aggFunc: 'sum'},
                {headerName: "GBP", field: "gbp1", width: 70, cellRenderer: currencyRenderer, aggFunc: 'sum'}
            ]
        },
        {
            headerName: 'Week 2',
            children: [
                {headerName: "Units", field: "amount2", width: 70, aggFunc: 'sum'},
                {headerName: "GBP", field: "gbp2", width: 70, cellRenderer: currencyRenderer, aggFunc: 'sum'}
            ]
        },
        {
            headerName: 'Week 3',
            children: [
                {headerName: "Units", field: "amount3", width: 70, aggFunc: 'sum'},
                {headerName: "GBP", field: "gbp3", width: 70, cellRenderer: currencyRenderer, aggFunc: 'sum'}
            ]
        },
        {
            headerName: 'Period Total',
            children: [
                {headerName: "Units", field: "amountTotal", width: 70, aggFunc: 'sum'},
                {headerName: "GBP", field: "gbpTotal", width: 70, cellRenderer: currencyRenderer, aggFunc: 'sum'}
            ]
        }
    ];

    function currencyRenderer(params) {
        if (params.value) {
            return '£ ' + params.value.toLocaleString();
        } else {
            return null;
        }
    }

    $scope.gridOptions = {
        columnDefs: columnDefs,
        rowData: createRowData(),
        rowSelection: 'single',
        groupHeaders: true,
        groupDefaultExpanded: 9999,
        groupIncludeFooter: true,
        enableColResize: true,
        enableSorting: false,
        forPrint: true,
        groupSuppressAutoColumn: true,
        icons: {
            groupExpanded: '<i class="fa fa-minus-square-o"/>',
            groupContracted: '<i class="fa fa-plus-square-o"/>'
        },
        enableFilter: false
    };

    function createRowData() {
        var rows = [];
        ['Ales','Larger','Cider','Wine','Spirits'].forEach( function (item) {
            rows.push({category: 'Alcoholic Drinks', item: item});
        });

        ['Water','Juice','Soda','Milk'].forEach( function (item) {
            rows.push({category: 'Non-Alcoholic Drinks', item: item});
        });

        rows.forEach( function(row) {

            row.amount1 = Math.round(Math.random() * 100);
            row.amount2 = Math.round(Math.random() * 100);
            row.amount3 = Math.round(Math.random() * 100);
            row.amountTotal = row.amount1 + row.amount2 + row.amount3;

            row.gbp1 = row.amount1 * 22;
            row.gbp2 = row.amount2 * 22;
            row.gbp3 = row.amount3 * 22;
            row.gbpTotal = row.amountTotal * 22;
        });

        return rows;
    }
});

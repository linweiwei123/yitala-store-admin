"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * Created by Linweiwei on 2016/12/22.
 */
var core_1 = require("@angular/core");
var alert_component_1 = require("../share/alert/alert.component");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var product_service_1 = require("../share/service/product.service");
var global_loading_component_1 = require("../share/loading/global-loading.component");
var DashboardComponent = (function (_super) {
    __extends(DashboardComponent, _super);
    function DashboardComponent(modalService, productService) {
        var _this = _super.call(this) || this;
        _this.modalService = modalService;
        _this.productService = productService;
        _this.onSaleSoldLoading = false;
        _this.categoryShareLoading = false;
        return _this;
    }
    DashboardComponent.prototype.ngOnInit = function () {
        // $("#id").html(`<h2>jquery标题</h2>`);
        this.initTotalStatistic();
        this.initLineChart();
        this.initPieChart();
    };
    DashboardComponent.prototype.initTotalStatistic = function () {
        var _this = this;
        this.productService.getJson("api/statistics")
            .then(function (response) {
            var databack = JSON.parse(response["_body"]);
            _this.totalProduct = databack.totalProduct;
            _this.totalSold = databack.totalSold;
            _this.totalOnSale = databack.totalOnSale;
            _this.currentMonthIn = databack.currentMonthIn;
            _this.onSalePercent = parseInt(_this.totalSold) / parseInt(_this.totalProduct);
            _this.currentMonInPercent = parseInt(_this.currentMonthIn) / parseInt(_this.totalOnSale);
        })
            .catch(function (error) {
            console.log(error);
            _this.openModel("系统错误，请联系管理员");
        });
    };
    DashboardComponent.prototype.initLineChart = function () {
        var _this = this;
        this.onSaleSoldLoading = true;
        this.productService.getJson("api/statistics/onsalesold")
            .then(function (response) {
            _this.onSaleSoldLoading = false;
            var databack = JSON.parse(response["_body"]);
            var xAxisCategories = databack[0].xAixsData;
            var yname1 = databack[0].chart;
            var yname2 = databack[1].chart;
            var ydata1 = databack[0].yAixsData;
            var ydata2 = databack[1].yAixsData;
            _this.line = {
                chart: {
                    type: 'spline'
                },
                credits: false,
                title: {
                    text: '商品库存与销售量'
                },
                xAxis: {
                    categories: xAxisCategories
                },
                yAxis: {
                    title: {
                        text: '数量'
                    }
                },
                tooltip: {
                    crosshairs: true,
                    shared: true
                },
                plotOptions: {
                    spline: {
                        marker: {
                            radius: 4,
                            lineColor: '#666666',
                            lineWidth: 1
                        }
                    }
                },
                series: [{
                        name: yname1,
                        marker: {
                            symbol: 'square'
                        },
                        data: ydata1
                    }, {
                        name: yname2,
                        marker: {
                            symbol: 'diamond'
                        },
                        data: ydata2
                    }]
            };
        })
            .catch(function (error) {
            _this.onSaleSoldLoading = false;
            console.log(error);
            _this.openModel("系统错误，请联系管理员");
        });
    };
    DashboardComponent.prototype.initPieChart = function () {
        var _this = this;
        this.categoryShareLoading = true;
        this.productService.getJson("api/statistics/categoryshare")
            .then(function (response) {
            _this.categoryShareLoading = false;
            var databack = JSON.parse(response["_body"]);
            var data = [];
            for (var i = 0; i < databack.xAixsData.length; i++) {
                data.push({ name: databack.xAixsData[i], y: databack.yAixsData[i] });
            }
            _this.pie = {
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false,
                    type: 'pie',
                    reflow: true
                },
                credits: false,
                title: {
                    text: '商品种类占比'
                },
                tooltip: {
                    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            format: '<b>{point.name}</b>: {point.percentage:.1f} %'
                        }
                    }
                },
                series: [{
                        name: '占比',
                        data: data
                    }]
            };
        })
            .catch(function (error) {
            _this.categoryShareLoading = false;
            console.log(error);
            _this.openModel("系统错误，请联系管理员");
        });
    };
    DashboardComponent.prototype.openModel = function (msg) {
        var modalRef = this.modalService.open(alert_component_1.AlertComponent, { backdrop: "static", keyboard: false, size: "sm" });
        modalRef.componentInstance.msg = msg;
    };
    return DashboardComponent;
}(global_loading_component_1.GlobalLoadingComponent));
DashboardComponent.decorators = [
    { type: core_1.Component, args: [{
                selector: "my-dashboard",
                templateUrl: "dashboard.component.html",
                styleUrls: ["dashboard.component.css"]
            },] },
];
/** @nocollapse */
DashboardComponent.ctorParameters = function () { return [
    { type: ng_bootstrap_1.NgbModal, },
    { type: product_service_1.ProductService, },
]; };
exports.DashboardComponent = DashboardComponent;
//# sourceMappingURL=dashboard.component.js.map
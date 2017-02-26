/**
 * Created by Linweiwei on 2016/12/22.
 */
import {Component, OnInit} from "@angular/core";
import {AlertComponent} from "../share/alert/alert.component";
import {NgbModal} from "@ng-bootstrap/ng-bootstrap";
import {ProductService} from "../share/service/product.service";
import {Response} from "@angular/http";
import {GlobalLoadingComponent} from "../share/loading/global-loading.component";
@Component({
    selector:"my-dashboard",
    templateUrl:"dashboard.component.html",
    styleUrls:["dashboard.component.css"]
})

export class DashboardComponent extends GlobalLoadingComponent implements OnInit{

    totalProduct:string;
    totalSold:string;
    totalOnSale:string;
    currentMonthIn:string;
    onSalePercent:number;
    currentMonInPercent:number;
    line:any;
    pie:any;
    onSaleSoldLoading:boolean = false;
    categoryShareLoading:boolean = false;

    constructor(
        private modalService:NgbModal,
        private productService:ProductService
    ){
        super();
    }

    ngOnInit(): void {
       // $("#id").html(`<h2>jquery标题</h2>`);
        this.initTotalStatistic();
        this.initLineChart();
        this.initPieChart();
    }

    initTotalStatistic():void{
        this.productService.getJson("api/statistics")
            .then((response:Response)=>{
                let databack = JSON.parse(response["_body"]);
                this.totalProduct = databack.totalProduct;
                this.totalSold = databack.totalSold;
                this.totalOnSale = databack.totalOnSale;
                this.currentMonthIn = databack.currentMonthIn;
                this.onSalePercent = parseInt(this.totalSold)/parseInt(this.totalProduct);
                this.currentMonInPercent = parseInt(this.currentMonthIn)/parseInt(this.totalOnSale)
            })
            .catch((error:any)=>{
                console.log(error);
                this.openModel("系统错误，请联系管理员");
            })
    }

    initLineChart():void{
        this.onSaleSoldLoading = true;
        this.productService.getJson("api/statistics/onsalesold")
            .then((response:Response)=>{
                this.onSaleSoldLoading = false;
                let databack = JSON.parse(response["_body"]);
                let xAxisCategories = databack[0].xAixsData;
                let yname1 = databack[0].chart;
                let yname2 = databack[1].chart;
                let ydata1 = databack[0].yAixsData;
                let ydata2 = databack[1].yAixsData;
                this.line = {
                    chart: {
                        type: 'spline'
                    },
                    credits:false,
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
                    series:[{
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
                }
            })
            .catch((error:any)=>{
                this.onSaleSoldLoading = false;
                console.log(error);
                this.openModel("系统错误，请联系管理员");
            })

    }

    initPieChart():void{
        this.categoryShareLoading = true;
        this.productService.getJson("api/statistics/categoryshare")
            .then((response:Response)=>{
                this.categoryShareLoading = false;
                let databack = JSON.parse(response["_body"]);
                let data:any = [];
                for(let i=0;i<databack.xAixsData.length;i++){
                    data.push({ name: databack.xAixsData[i],y: databack.yAixsData[i] });
                }
                this.pie = {
                    chart: {
                        plotBackgroundColor: null,
                        plotBorderWidth: null,
                        plotShadow: false,
                        type: 'pie',
                        reflow:true
                    },
                    credits:false,
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
                    series:  [{
                        name: '占比',
                        data: data
                    }]
                }
            })
            .catch((error:any)=>{
                this.categoryShareLoading = false;
                console.log(error);
                this.openModel("系统错误，请联系管理员");
            })

    }

    openModel(msg:string):void{
        const modalRef = this.modalService.open(AlertComponent,{backdrop:"static",keyboard:false,size:"sm"});
        modalRef.componentInstance.msg = msg;
    }

}
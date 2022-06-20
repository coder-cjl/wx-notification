// components/datePicker/datePicker.js

const App = getApp();
const dateTimePicker = require("../../utils/datePicker")
Component({
    options: {
        addGlobalClass: true
    },

    properties: {
        params: {
            type: Object,
            value: {
                placeholder: "请选择时间",
                startDateTime: "",
                endDateTime: "",
                pText: ""
            }
        },
    },

    data: {
        dateTimeArray: null,
        dateTime: null,
        startDateTime: "",
        endDateTime: "",
        dateTimeWhole: ""
    },

    lifetimes: {
        attached: function () {
            this.setData({
                startDateTime: this.data.params.startDateTime,
                endDateTime: this.data.params.endDateTime
            })
            this.ininData()
        }
    },

    pageLifetimes: {
        show: function() {
            this.setData({
                startDateTime: this.data.params.startDateTime,
                endDateTime: this.data.params.endDateTime
            })
            this.ininData()
        },
        hide: function() {

        },
        resize: function() {

        }
    },

    methods: {
        ininData(date) {
            this.data.unit = ["年", "月", "日", "时", "分"];
            this.data.dateTimePicker = dateTimePicker.newDateTimePicker(this.data.startDateTime, this.data.endDateTime, this.data.params.pText);
            let obj = this.data.dateTimePicker.render();
            let lastArray = obj.dateTimeArray;
            let lastTime = obj.dateTime;
            for (let i = 0; i < lastArray.length; i++) {
                lastArray[i] = lastArray[i].map(m => m + this.data.unit[i])
            }
            this.data.dateTimeArray = lastArray;
            this.data.dateTime = lastTime;
            this.setData({
                dateTimeArray: this.data.dateTimeArray,
                dateTime: this.data.dateTime
            })
        },

        changeDateTimeColumn(e) {
            const { column, value } = e.detail;
            let dateTimeTemp = "dateTime["+column+"]"
            this.setData({
                [dateTimeTemp]: value
            })
            this.data.dateTimePicker.setValue({
                dateTimeArray: this.data.dateTimeArray,
                dateTime: this.data.dateTime
            })
            for (let i = 1; i < this.data.dateTime.length; i++) {
                if (column == i - 1) {
                    for (let j = i; j < this.data.dateTime.length; j++){
                        let temp = "dateTime["+j+"]";
                        this.setData({
                            [temp]: 0
                        })
                    }
                }
                let arr = this.data.dateTimePicker.dispatch(i).map(m => m + this.data.unit[i])
                let temp1 = "dateTimeArray["+i+"]"
                this.setData({
                    [temp1]: arr
                })
            }
            this.setData({
                dateTimeArray: this.data.dateTimeArray,
                dateTime: this.data.dateTime
            })
        },
    }
})
Page({

    /**
     * 页面的初始数据
     */
    data: {

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad(options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide() {

    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage() {

    }
})
// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isSeletedTag: 0,
        button1: "default",
        button2: "default",
        button3: "default",
        button4: "default",
        firstTime: "",
        lastTime: ""
    },

    on24ButtonAction: function() {
        this.setData({
            isSeletedTag: 1,
            button1: "primary",
            button2: "default",
            button3: "default",
            button4: "default"
        })
    },

    on48ButtonAction: function() {
        this.setData({
            isSeletedTag: 2,
            button1: "default",
            button2: "primary",
            button3: "default",
            button4: "default"
        })
    },

    on72ButtonAction: function() {
        this.setData({
            isSeletedTag: 3,
            button1: "default",
            button2: "default",
            button3: "primary",
            button4: "default"
        })
    },

    on7dButtonAction: function() {
        this.setData({
            isSeletedTag: 4,
            button1: "default",
            button2: "default",
            button3: "default",
            button4: "primary"
        })
    },

    onPickerDate: function(date) {
        this.setData({
            firstTime: date.detail.value
        })
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
        var nowDate = new Date();
        var hour = nowDate.getHours();
        var min = nowDate.getMinutes();
        this.setData({
            firstTime: nowDate.toLocaleDateString() + "  " + hour + ":" + min
        })
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
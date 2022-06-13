// pages/home/home.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        isShow: false,
        time: "08:30",
        isSeleted: false,
        isSeletedTag: 0
    },

    on24ButtonAction: function() {
        console.log("on24ButtonAction")
        this.setData({
            isSeletedTag: 1,
        })
    },

    on48ButtonAction: function() {
        console.log("on48ButtonAction")
        this.setData({
            isSeletedTag: 2,
        })
    },

    on72ButtonAction: function() {
        console.log("on72ButtonAction")
        this.setData({
            isSeletedTag: 3,
        })
    },

    on7dButtonAction: function() {
        console.log("on7dButtonAction")
        this.setData({
            isSeletedTag: 4,
        })
    },

    onTapButton: function() {
        this.setData({
            isShow: !this.data.isShow
        }),
        console.log(isShow)
    },

    onListenDatePicker: function(e) {
        this.setData({
            time: e.detail.value,
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
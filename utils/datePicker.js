class BaseInfo {
    constructor() {
        this.newDate = new Date();
    }

    withDate(params) {
        return parseInt(params) < 10 ? "0" + params : "" + params;
    }

    getLoopArray(start, end) {
        var start = start || 0;
        var end = end || 0;
        var array = [];
        for(var i = start; i <= end; i++) {
            array.push(this.withDate(i));
        }
        return array;
    }

    formatArr(dateString) {
        return [...dateString.split(" ")[0].split("-"), ...dateString.split(" ")[1].split(":")];
    }

    beforeDateArr(disYear) {
        let year = this.newDate.getFullYear() - (disYear || 0);
        let month = this.newDate.getMonth() + 1;
        let day = this.newDate.getDay();
        let hour = this.newDate.getHours();
        let minute = this.newDate.getMinutes();
        return [year, month, day, hour, minute];
    }

    afterDateArr() {
        let year = this.withDate(this.newDate.getFullYear());
        let month = this.withDate(this.newDate.getMonth() + 1);
        let day = this.withDate(this.newDate.getDay());
        let hour = this.withDate(this.newDate.getHours());
        let minute = this.withDate(this.newDate.getMinutes());
        return [year, month, day, hour, minute];
    }
}

class DateTimePicker extends BaseInfo {

    constructor(startDate, endDate, defaultDate) {
        super();
        this.dateTimeArray = null;
        this.dateTime = null;
        this.startDate = super.formatArr(startDate);
        this.endDate = endDate ? super.formatArr(endDate) : super.afterDateArr();
        this.defaultDate = defaultDate ? super.formatArr(defaultDate) : this.startDate;
    }

    setValue(obj) {
        for (let key in obj) {
            this[key] = obj[key];
        }
    }

    getCurrentDateInfo() {
        return this.dateTime && this.dateTimeArray ? {
            year: this.dateTimeArray[0][this.dateTime[0]],
            month: this.dateTimeArray[1][this.dateTime[1]],
            day: this.dateTimeArray[2][this.dateTime[2]],
            hour: this.dateTimeArray[3][this.dateTime[3]],
            minnte: this.dateTimeArray[4][this.dateTime[4]]
        } : []
    }

    /// 月
    getMonths() {
        let arrays = [];
        const year = (this.getCurrentDateInfo().year || this.defaultDate[0]).replace(/年/, "");
        if (this.startDate[0] == this.endDate[0]) {
            arrays = super.getLoopArray(parseInt(this.startDate[1]), parseInt(this.endDate[1]));
        } else {
            switch(year) {
                case this.startDate[0]:
                    arrays = super.getLoopArray(parseInt(this.startDate[1]), 12);
                    break;
                case this.endDate[0]:
                    arrays = super.getLoopArray(1, parseInt(this.endDate[1]));
                    break;
                default:
                    arrays = super.getLoopArray(1, 12);
                    break;
            }
        }
    }

    /// 天
    getDays() {
        let arrays = [];
        let lastDay = null;
        const year = (this.getCurrentDateInfo().year || this.defaultDate[0]).replace(/年/, "");
        const month = (this.getCurrentDateInfo().month || this.defaultDate[1]).replace(/月/, "");
        const flag = year % 400 == 0 || (year % 4 && year % 100 != 0);
        switch (month) {
            case "01":
            case "03":
            case "05":
            case "07":
            case "08":
            case "10":
            case "12":
                lastDay = 31;
                break;
            case "04":
            case "06":
            case "09":
            case "11":
                lastDay = 30;
                break;
            case "02":
                lastDay = flag ? 29 : 28;
            default:
                arrays = "月份不正确，请重新输入！"
        }
        const afterDateArray = super.afterDateArr();
        const _start = year == this.startDate[0] && month == this.startDate[1];
        const _end = year == this.endDate[0] && month == this.endDate[1];
        if (this.startDate[0] == this.endDate[0] && this.startDate[1] == this.endDate[1]) {
            arrays = super.getLoopArray(parseInt(this.startDate[2]), parseInt(this.endDate[2]));
        } else {
            if (_start) {
                arrays = super.getLoopArray(parseInt(this.startDate[2]), lastDay);
            } else if (_end) {
                arrays = super.getLoopArray(1, parseInt(this.endDate[2]));
            } else {
                arrays = super.getLoopArray(1, lastDay);
            }
        }
    }

    /// 小时
    getHours() {
        let arrays = [];
        const year = (this.getCurrentDateInfo().year || this.defaultDate[0]).replace(/年/, "");
        const month = (this.getCurrentDateInfo().month || this.defaultDate[1]).replace(/月/, "");
        const day = (this.getCurrentDateInfo().day || this.defaultDate[2]).replace(/日/, "");
        const _start = year == this.startDate[0] && month == this.startDate[1] && day == this.startDate[2];
        const _end = year == this.endDate[0] && month == this.endDate[1] && day == this.endDate[2];
        const _equal = this.startDate[0] == this.endDate[0] && this.startDate[1] == this.endDate[1] && this.startDate[2] == this.endDate[2];
        if (_equal) {
            arrays = super.getLoopArray(parseInt(this.startDate[3]), parseInt(this.endDate[3]));
        } else {
            if (_start) {
                arrays = super.getLoopArray(parseInt(this.startDate[3], 23));
            } else if (_end) {
                arrays = super.getLoopArray(0, parseInt(this.endDate[3]));
            } else {
                arrays = super.getLoopArray(0, 23);
            }
        }
        return arrays;
    }
    
    getMinutes() {
        let arrays = [];
        const year = (this.getCurrentDateInfo().year || this.defaultDate[0]).replace(/年/, '');
        const month = (this.getCurrentDateInfo().month || this.defaultDate[1]).replace(/月/, '');
        const day = (this.getCurrentDateInfo().day || this.defaultDate[2]).replace(/日/, '');
        const hour = (this.getCurrentDateInfo().hour || this.defaultDate[3]).replace(/时/, '');
        const _start = year == this.startDate[0] && month == this.startDate[1] && day == this.startDate[2] && hour == this.startDate[3];
        const _end = year == this.endDate[0] && month == this.endDate[1] && day == this.endDate[2] && hour == this.endDate[3];
        const _equal = this.startDate[0] == this.endDate[0] && this.startDate[1] == this.endDate[1] && this.startDate[2] == this.endDate[2] && this.startDate[3] == this.endDate[3];
        if (_equal) {
            arrays = super.getLoopArray(parseInt(this.startDate[4]), parseInt(this.endDate[4]));
        } else {
            if (_start) {
                arrays = super.getLoopArray(parseInt(this.startDate[4]), 59)
            } else if(_end) {
                arrays = super.getLoopArray(0, parseInt(this.endDate[4]))
            } else {
                arrays = super.getLoopArray(0, 59)
            }
        }
        return arrays;
    }

    dispatch(index) {
        let arrays = [];
        switch (index) {
            case 0:
                arrays = super.getLoopArray(this.startDate[0], this.endDate[0]);
                break;
            case 1:
                arrays = this.getMonths();
                break;
            case 2:
                arrays = this.getDays();
                break;
            case 3:
                arrays = this.getHours();
                break;
            case 4:
                arrays = this.getMinutes();
                break;
            default:
                break
        }
        return arrays;
    }

    render() {
        const dateTime = [];
        const dateTimeArray = [
            [],
            [],
            [],
            [],
            []
        ];
        for (let i = 0; i < dateTimeArray.length; i++) {
            dateTimeArray[i] = this.dispatch[i];
        }
        dateTimeArray.forEach((current, index) => {
            const _index = current.indexOf(this.defaultDate[index]);
            dateTime.push(_index == -1 ? 0 : _index);
        });
        return {dateTimeArray, dateTime};
    }
} 

function newDateTimePicker(startDateTime, endDateTime, pText) {
    let newDateTimePicker = new DateTimePicker(startDateTime, endDateTime, pText);
    return newDateTimePicker;
}

module.exports = {
    newDateTimePicker: newDateTimePicker,
}
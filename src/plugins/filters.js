export default (Vue) => {
    Vue.filter("toFixed",(val) => {
        if(val == 0) {
            return val;
        }
        return +val.toFixed(2)
    })
}   
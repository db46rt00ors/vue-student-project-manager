export default (Vue) => {
    Vue.directive('height',{
        inserted(el, binding){
            // console.log(binding.value)
            if(typeof binding.value == 'number'){
                $(el).height($(window).height() - binding.value)
                
            }else{
                $(el).height($(window).height())
            }
        }
    });
    Vue.directive('style',{
        inserted(el, binding){
            for (let k in binding.value){
                $(el).css({
                    [k]: binding.value[k]
                })
            }
        }
    });
}
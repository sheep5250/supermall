export const itemListenerMixin = {
    mounted() {
        const refresh = this.debounce(this.$refs.scroll.refresh, 200);
        console.log("我是混入1");
        // 监听图片中加载完成，重新计算 better-scroll，当 DOM 结构发生变化的时候务必要调用确保滚动的效果正常
        this.itemImageListening = () => {
            refresh();
        };
        this.$bus.$on("itemImageLoad", this.itemImageListening);
     
    },
    methods: {
        // 事件监听
        // 频繁刷新的防抖函数
        debounce(func, delay) {
            console.log("2");
            let timer = null;
            return function (...args) {
                if (timer) clearTimeout(timer);
                timer = setTimeout(() => {
                    // func.apply(this, args);
                    func();
                }, delay);
            };
        }
    }
}
<template>
    <div class="recommend">
        <div v-for="item in recommends" :key="item.image" class="recommend-item">
            <a :href="item.link">
                <img :src="item.image">
                <div>{{item.title}}</div>
            </a>
        </div>
    </div>
</template>

<script>

export default {
    props:{
        recommends:{
            type: Array,
            default(){
                return []
            }
        }
    },
}
</script>

<style scoped>
.recommend{
    display: flex;
    text-align: center;
    font-size: 16px;
    padding: 10px 0 15px 0;
    border-bottom: 10px solid #eee;
}
.recommend-item{
    flex: 1;
}
.recommend-item img{
    width: 70px;
    height: 70px;
    margin-bottom: 10px;
}
</style>
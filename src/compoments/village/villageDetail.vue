<template>
    <div>
        <div>小区详情</div>
        <router-link to="/village">
            <button class="btn btn-success">返回</button>
        </router-link>
    </div>
</template>
<style scoped>

</style>
<script>
    export default{
        data(){
            return {
                msg: 'hello vue'
            }
        },
        components: {},
        created : function () {
            this.getMap();
        },
        methods : {
            getMap(){
                var map = new AMap.Map('map',{resizeEnable: true,zoom:4});
                var markers = []; //province见Demo引用的JS文件
                for (var i = 0; i < provinces.length; i += 1) {
                    var marker;
                    if (provinces[i].type === 0) {
                        var icon = new AMap.Icon({
                            image: 'https://vdata.amap.com/icons/b18/1/2.png',
                            size: new AMap.Size(24, 24)
                        });
                        marker = new AMap.Marker({
                            icon: icon,
                            position: provinces[i].center.split(','),
                            offset: new AMap.Pixel(-12,-12),
                            zIndex: 101,
                            title: provinces[i].name,
                            map: map
                        });
                    } else {
                        marker = new AMap.Marker({
                            position: provinces[i].center.split(','),
                            title: provinces[i].name,
                            map: map
                        });
                        if (provinces[i].type === 2) {
                            var content= "<div class = 'taiwan'>宝岛台湾</div>";
                            baodao = new AMap.Marker({
                                content: content,
                                position: provinces[i].center.split(','),
                                title: provinces[i].name,
                                offset: new AMap.Pixel(0,0),
                                map: map
                            });
                        }
                    }
                    markers.push(marker);
                }
                map.setFitView();
            }
        }
    }
</script>
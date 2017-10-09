<template>
    <div>
        <div id="main" style="height: 1000px;"></div>
    </div>
</template>

<script>
    export default{
        mounted(){
            let data =[];
            this.$http.post('manager/department/position/id/1').then((res) => {
                let data = res.data.data.data;
                this.organizePicture(data);
            });


        },
        methods :{
            organizePicture(data){
                let myChart = echarts.init(document.getElementById('main'));
                let option = {
                    title: {
                        text: '组织架构图'
                    },

                    series: [{
                        name: '树图',
                        type: 'tree',
                        orient: 'horizontal', // vertical horizontal
                        rootLocation: {
                            x: 200,
                            y: 420
                        }, // 根节点位置  {x: 100, y: 'center'}
                        nodePadding: 8,
                        layerPadding: 200,
                        hoverable: true,
                        roam: true,
                        symbolSize: 15,
                        itemStyle: {
                            normal: {
                                color: '#444',
                                label: {
                                    show: true,
                                    position: 'right',
                                    formatter: "{b}"
//                        textStyle: {
//                            color: '#666',
//                            fontSize: 14
//                        }
                                },
                                lineStyle: {
                                    color: '#dedede',
                                    type: 'broken' // 'curve'|'broken'|'solid'|'dotted'|'dashed'

                                }
                            },
                            emphasis: {
                                color: '#444',
                                label: {
                                    show: true
                                },
                                borderWidth: 0
                            }
                        }

                    }]
                };

                option.series[0].data = data;

                myChart.setOption(option);
            }
        }
    }
</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
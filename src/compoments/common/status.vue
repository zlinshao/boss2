<template>
    <div>
        <div v-if="state.state_success" id="success"
             class="alert alert-block alert-success fade in pull-right text-center">
            <button data-dismiss="alert" class="close close-sm" type="button">
                <i class="fa fa-times"></i>
            </button>
            <p>{{state.success}}</p>
        </div>
        <div id="err" v-if="state.state_error" class="alert alert-block alert-danger fade in pull-right text-center">
            <button data-dismiss="alert" class="close close-sm" type="button">
                <i class="fa fa-times"></i>
            </button>
            <p>{{state.error}}</p>
        </div>
    </div>
</template>

<script>
    export default {
        props: ['state'],
        updated (){
            setTimeout(() => {
                this.state.state_success = false;
            },1000);
            setTimeout(() => {
                this.state.state_error = false;
            },3000);
        },
    }
</script>


<style scoped>
    #success {
        width: 570px;
        position: fixed;
        top: 4px;
        right: 15px;
        z-index: 2222;
    }

    #err {
        width: 570px;
        position: fixed;
        top: 4px;
        right: 15px;
        z-index: 2222;
    }

    @media screen and (max-width: 767px) {
        #success, #err {
            width: 91%;
            right: 22px;
        }
    }
</style>

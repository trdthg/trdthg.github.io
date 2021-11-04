<template>
    <div>
        <div id='logo' style='z-index:10;'>
            <img id='logoleft' src='/assets/img/logo-left.png' style='width:120px;height:auto;'>
            <img id='logoright' src='/assets/img/logo-right.png' style='width:120px;height:auto;'>
        </div>
        <div id='texthidden'>
            我&nbsp;&nbsp;裂开了<br><br><br>
            <img src='/assets/img/dog.jpg' style='width:70px;height:auto;'>
        </div>
        <br>
    </div>
</template>
<style scoped>
    #logo > *{
        transition: 1s;
        margin:0;
    }

    #logo:hover > #logoleft{
        /* margin-right:100px; */
        transition: 1s;
        transform: translate( 200%, 0);

    }
    #logo:hover > #logoright{
        transition: 1s;
        /* margin-left:100px; */
        transform: translate( 100%, 0);
    }
    #texthidden{
        z-index:9;
         /* color: rgba(255, 255, 255, 0); */
         opacity:0;
         position:absolute ;
         transition: 1s;
    }
    #logo:hover + #texthidden{
        opacity: 100;
        margin-top:-250px;

        transition: 1s;
        /* color: rgba(255, 255, 255, 1); */
    }
</style>

<script>
export default {
    name:"Devide-logo"
}
</script>
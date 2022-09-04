<template>
    <header class="flex">
        <div class="branding flex">
            <img src="@/assets/file-invoice-dollar-solid.png" alt="">
        </div>
    </header>
</template>
<script>
export default {
    name: "navigation",
}
</script>
<style lang="scss" scoped>
    header {
        z-index: 99;
        flex-direction: row;
        background-color: #1e2139;
        @media(min-width: 900px){
            min-height: 100%;
            min-width: 99px;
            flex-direction: column;
            border-radius: 0 20px 20px 0; //top-left top-right bottom-right bottom-left
        }

        .branding{ 
            border-radius: 0 20px 20px 0;
            background-color: #7c5dfa;
            justify-content: center;
            padding: 24px;
            @media(min-width: 900px){
                width: 100%;
            }

            img{
                width: auto;
                height: 30px;
            }
        }
    }
</style>
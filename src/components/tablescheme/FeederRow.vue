
<template>
    <div 
    class="feeder-row" 
    :class="{selected: isselected, hover: isHovered && !isselected}"
    
    >
    <slot />
    </div>
</template>

<script setup lang="ts">


const props = defineProps({
    isselected: Boolean,
    isHovered: Boolean
})


</script>



<style scoped>
.selected {
    background: var(--row-bg-selected-color);

}


.feeder-row {
    display: flex;
    align-items: stretch;
    height: 50px;
    border-bottom: 2px solid gray;
}

.hover{
background: var(--row-bg-hover-color);
}

</style>
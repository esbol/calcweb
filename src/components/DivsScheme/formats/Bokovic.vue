<template>
    <div class="bokovic-container no-select">
        <div class="row" style="height: 300px;">
            <div class="div-cell" style="width: 100px; height: 300px; border-right: 1px solid var(--scheme-line-color);">
                <div class=vertical-text style="white-space: nowrap;">Распределительное устройство</div>
            </div>
            <div class="vert-flex">
                <div class="horizontal-text">Вводной аппарат: обозначение, тип, Iном, А, расцепитель или плавкая вставка, А
                </div>
                <div class="horizontal-text" style="border-top: 1px solid var(--scheme-line-color);">Аппарат отходящий
                    линии: обозначение, тип, Iном, А, расцепитель или плавкая
                    вставка, А
                </div>
            </div>
        </div>

        <div class="row" style="height: 226px;">
            <div class="div-cell" style="width: 100%;">
                <div class="vertical-text">Маркировка - расчетная нагрузка, кВт - коэффициент мощности - расчетный ток, А -
                    длина участка, м, потеря напряжения, %
                </div>
            </div>
            <div class="div-cell" style="width: 100%; border-left: 1px solid var(--scheme-line-color);">
                <div class="vertical-text">Марка, сечение проводника - способ прокладки</div>
            </div>
        </div>
        <div class="row" style="height: 50px;">
            <div class="horizontal-text">Пусковой аппарат: обозначение, тип, Iном, А, расцепитель или плавкая вставка, А
            </div>
        </div>
        <div class="row" style="height: 201px;">
            <div class="div-cell" style="width: 100%;">
                <div class="vertical-text">Маркировка - расчетная нагрузка, кВт - коэффициент мощности - расчетный ток, А -
                    длина участка, м, потеря напряжения, %
                </div>
            </div>
            <div class="div-cell" style="width: 100%; border-left: 1px solid var(--scheme-line-color);">
                <div class="vertical-text">Марка, сечение проводника - способ прокладки</div>
            </div>
        </div>
        <div class="row" style="height: 30px;">
            <div class="horizontal-text">Обозначение</div>
        </div>
        <div class="row" style="height: 30px;">
            <div class="horizontal-text">Руст или Рном, кВт</div>
        </div>
        <div class="row" style="height: 30px;">
            <div class="horizontal-text">Iрасч или Iном/Iпуск, А</div>
        </div>
        <div class="row" style="height: 62px;">
            <div class="horizontal-text">Наименование, тип, обозначение чертежа, принципиальной схемы</div>
        </div>
    </div>
</template>

<script setup lang="ts">


</script>

<style scoped>
.div-cell {
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    
    /* border: 1px solid green; */
}

.vertical-text {
    position: absolute;
    transform: rotate(-90deg);
    width: 200px;
    text-align: center;

    /* border: 1px solid red; */
}

.horizontal-text {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    width: 100%;
    text-align: center;
   
    /* border: 1px solid brown; */
}

.vert-flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    vertical-align: middle;
}

.row {
    display: flex;
    width: 220px;
    border-bottom: 1px solid var(--scheme-line-color);
}

.bokovic-container {
 
    display: flex;
    flex-direction: column;
    border-right: 1px solid var(--scheme-line-color);
}</style>
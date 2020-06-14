<template>
    <nav aria-label="Page navigation example">
        <ul class="pagination justify-content-center">
            <li class="page-item" v-bind:class="{'disabled':activePage <= 0}">
                <a class="page-link" tabindex="-1" :aria-disabled="activePage <= 0" v-on:click="setActivePage(activePage-1)">
                    <span aria-hidden="true">&laquo;</span>
                </a>
            </li>
            <li v-for="(item) in pagesCount" :key="item" class="page-item" v-bind:class="{'active': item-1 == activePage}">
                <a class="page-link" v-on:click="setActivePage(item-1)">{{item}}</a>
            </li>
            <li class="page-item" v-bind:class="{'disabled':activePage >= pagesCount-1}">
                <a class="page-link" :aria-disabled="activePage >= pagesCount-1" v-on:click="setActivePage(activePage+1)">
                    <span aria-hidden="true">&raquo;</span>
                </a>
            </li>
        </ul>
    </nav>
</template>

<script>
import {serverBus} from '../main';

export default {
    name: 'Pagination',
    props: {
        elementsPerPage: {
            type: Number,
            required: true,
            default: 5
        }
    },
    data() {
        return {
            activePage: 0,
            pagesCount: 0
        }
    },
    methods: {
        setActivePage(page) {
            this.activePage = page;
            serverBus.$emit('activePage', this.activePage);
        }
    },
    mounted() {
        serverBus.$on('pagesCount', (pagesCount) => {
            this.pagesCount = pagesCount
        });
        serverBus.$on('activePage', (activePage) => {
            this.activePage = activePage;
        });
    }
}
</script>

<style>

</style>
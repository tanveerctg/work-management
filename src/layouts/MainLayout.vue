<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-input filled v-model="search" v-on:keyup="searchHandler" label="Search Project" :dense="dense" label-color="black" class="searchProject" standout="bg-grey-11 text-grey-2"  />
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item clickable v-ripple @click="addProjectHandler">
            <q-item-section avatar>
              <q-icon name="add" />
            </q-item-section>
            <q-item-section>
              Add Project
            </q-item-section>
        </q-item>
      </q-list>
    </q-drawer>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { mapActions } from 'vuex'
import { v4 as uuidv4 } from 'uuid';

export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false,
       dense: false,
       search:''
    }
  },
  methods:{
     ...mapActions(['searchProject','addProject']),
    addProjectHandler:function() {
      this.$q.dialog({
        title: '',
        message: 'What is project\'s name? (Minimum 3 characters)',
        prompt: {
          model: '',
          isValid: val => val.length > 2, // << here is the magic
          type: 'text' // optional
        },
        cancel: true,
        persistent: true
      }).onOk(data => {
        // console.log('>>>> OK, received', data)
        this.addProject({data,id:uuidv4()})
      })
    },
    searchHandler:function(e){
    	this.searchProject(this.search);
    	
    }
  }
}
</script>
<style scoped>
.q-item__section--avatar{
  min-width:0px;
}
.q-layout__section--marginal {
    background-color: #1976D2;
    background-color: black;
    color: #fff;
    padding: 5px 0;
}
.searchProject{
	margin-left:10px;
	background:white;
}
</style>

<template>
    <v-main class="list">
        <h3 class="text-h3 font-weight-medium mb-5">To Do List</h3>

        <v-card>
            <v-card-title>
                <v-text-field
                    v-model="search"
                    append-icon="mdi-magnify"
                    label="Search"
                    single-line
                    hide-details
                ></v-text-field>
                <v-spacer></v-spacer>
                <v-btn color="success" dark @click="dialog = true">
                    Tambah
                </v-btn>
            </v-card-title>
            <v-data-table :headers="headers" :items="todos" :search="search">
                <template v-slot:[`item.actions`]="{ item }">
                    <v-icon small class="icnote mr-2" @click="detailItem(item)">{{ icons.mdiTextBoxSearchOutline}}</v-icon>
                    <v-icon small class="pencil mr-2" @click="editItem(item)">  {{ icons.mdiPencil }}</v-icon>
                    <v-icon small class="bin mr-2" @click="deleteItem(item)">   {{ icons.mdiDelete }}</v-icon>
                </template>
                <template v-slot:[`item.priority`]="{ item }">
                    <span v-if="item.priority == 'Penting'">
                        <v-chip
                        class="ma-2"
                        color="red"
                        text-color="white"
                        >
                        Penting
                        </v-chip>
                    </span>
                    <span v-else-if="item.priority == 'Tidak penting'">
                        <v-chip
                        class="ma-2"
                        color="green"
                        text-color="white"
                        >
                        Tidak Penting
                        </v-chip>
                    </span>
                    <span v-else>
                         <v-chip
                        class="ma-2"
                        color="primary"
                        >
                        Biasa
                        </v-chip>
                    </span>
                </template>
            </v-data-table>
        </v-card>

        <v-dialog v-model="dialog" persistent max-width="600px">
            <v-card>
                <v-card-title>
                    <span class="headline">Form Todo</span>
                </v-card-title>
                <v-card-text>
                    <v-container>
                        <v-text-field
                        v-model="formTodo.task"
                        label="Task"
                        required
                        ></v-text-field>

                        <v-select
                        v-model="formTodo.priority"
                        :items="['Penting', 'Biasa', 'Tidak penting']"
                        label="Priority"
                        required
                        ></v-select>

                        <v-textarea
                        v-model="formTodo.note"
                        label="Note"
                        required
                        ></v-textarea>

                    </v-container>
                </v-card-text>
                <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn color="blue darken-1" text @click="cancel" v-if="formTodo.task == null">
                        Cancel 
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="save" v-if="formTodo.task == null">
                        Save
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="cancelUpdate" v-if="formTodo.task != null">
                        Cancel 
                    </v-btn>
                    <v-btn color="blue darken-1" text @click="updateItem(item)" v-if="formTodo.task != null">
                        Update
                    </v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>


    </v-main>
</template>
<script>

import {
    mdiPencil,
    mdiDelete,
    mdiTextBoxSearchOutline,
} from '@mdi/js'

export default {
    name: "List",
    data(){
        return{
            dialognote: false,
            search: null,
            dialog: false,
            icons:{
                mdiPencil,
                mdiDelete,
                mdiTextBoxSearchOutline
            },
            headers: [
                {
                    text: "Task",
                    align: "start",
                    sortable: true,
                    value: "task",
                },
                { text: "Priority", value: "priority" },
                { text: "Note", value: "note" },
                { text: "Actions", value: "actions" },
            ],
            todos: [
                {
                    task: "bernafas",
                    priority: "Penting",
                    note: "huffttt",
                },
                {
                    task: "nongkrong",
                    priority: "Tidak penting",
                    note: "bersama teman-teman",
                },
                {
                    task: "masak",
                    priority: "Biasa",
                    note: "masak air 500ml",
                },
            ],
            formTodo: {
                task: null,
                priority: null,
                note: null,
            },
        };
    },
    methods: {
        save() {
            this.todos.push(this.formTodo);
            this.resetForm();
            this.dialog = false;
        },
        cancel(){
            this.resetForm();
            this.dialog = false;
            this.dialognote = false;
        },
        resetForm(){
            this.formTodo = {
                task: null,
                priority: null,
                note: null,
            };
        },
        editItem(item){
            this.formTodo = {
                task: item.task,
                priority: item.priority,
                note: item.note,
            }
            this.dialog = true;
            this.deleteItemEdit(item);
        },
        updateItem(item){
            this.save();
        },
        deleteItemEdit(item){
            this.todos = this.todos.filter(todo => todo !== item);
        },
        cancelUpdate(){
            this.save();
        },
        deleteItem(item){
            this.dialogdel
            let index = this.todos.indexOf(item)
            confirm('Yakin ingin menghapus?')  && this.todos.splice(index, 1)
        },
        detailItem(item) {
            this.formTodo = {
                task: item.task,
                priority: item.priority,
                note: item.note,
            }
            this.dialognote = true;
        },
    },
};
</script>
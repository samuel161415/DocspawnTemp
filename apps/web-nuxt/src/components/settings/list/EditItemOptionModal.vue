<template>
    <Dialog v-model:visible="visible" modal :draggable="false" :style="{  width: '45rem' }">
        
        <template #header>
            <div class="flex justify-center items-center ml-5">
                <p class="font-semibold text-xl flex justify-center text-center">Item options</p>
            </div>
        </template>
        
        <div class="px-5 my-5">
            <div class="flex flex-col align-items-center gap-3 mb-5">
                <label for="listname" class="font-semibold w-6rem text-lg">Item name <span class="text-red-400">*</span></label>
                <InputText id="listname" class="flex-auto" v-model="listItemName" placeholder="list Item Name" autocomplete="off" />
            </div>
        </div>

        <div v-if="props.editableItem?.level != 3" class="flex align-items-center px-5 mt-5 ">
            <Checkbox v-model="containsublist" inputId="containsublist" name="sublist" value="sublist"  :binary="true"/>
            <label for="containsublist" class="ml-2">Contains sublist</label>
        </div>

        <!--  -->
        <div v-if="containsublist" class="mt-5">
            <div class="px-5">

                <div class="flex flex-col align-items-center gap-2 mb-3">
                    <label for="sublistitems" class="font-semibold w-6rem text-lg">Sublist items <span class="text-red-400">*</span></label>
                    <span class="text-sm text-surface-500">Multiple entries are allowed <br/> (Comma separated entries)</span>
                    
                    <span v-if="addClicked && sublistItems.length === 0" class="text-sm text-error"><i class="pi pi-exclamation-triangle text-error mr-2"></i>You should add items</span>
                    <Textarea id="sublistItems" v-model="sublistItem" rows="10" cols="30" placeholder="List item" :invalid="addClicked && sublistItem === ''"/>
                </div>

                <Button 
                    label="Add" 
                    icon="pi pi-plus" 
                    @click="handleAdd" 
                    class="bg-success text-white hover:bg-success hover:border-success  my-2" /> 

                <DataTable 
                    :value="sublistItems" 
                    striped-rows
                    show-gridlines
                    :reorderableColumns="true"  
                    @rowReorder="onRowReorder" 
                    tableStyle="min-width: 30rem">

                    <Column field="index" :body-style="{ margin: '0rem', padding: '0rem' }" rowReorder style="width: 3%">
                    <template #rowreordericon>
                        <i class="pi pi-align-justify cursor-move p-6" data-pc-section="rowreordericon"
                        ></i>
                    </template>
                    </Column>
                    <Column field="name" header="Name" :body-style="{ margin: '0rem', padding: '0rem' }" >
                    <template #body="{data}">
                        <p class="ml-2">
                        {{ data["name"] }}
                        </p>
                    </template>
                    </Column>
                    <Column field="action" header="Actions" style="width: 3%">

                        <template #body="{data}">
                        <div  class="flex justify-center">
                            <i class="pi pi-trash text-error cursor-pointer" @click="deleteItem(data)"></i>
                        </div>
                        </template>
                    </Column>
                </DataTable>
            </div>
        </div>
     
        <!--  -->

        <div class="flex justify-center mt-5 mr-5">
            <Button label="Save" icon="pi pi-check" class="bg-success text-white hover:bg-success hover:border-success w-28" @click="handleEditItem" />
        </div>
        
    </Dialog>

</template>

<script setup>
  import { watch, ref } from "vue";

  const emit = defineEmits();
  const props= defineProps({
    editableItem: {
        type: Object,
        required: true
    },
    containsublist: {
        type: Boolean,
        required: true
    },
  });

  const sublistName = ref('');
  const sublistItem = ref('');
  const sublistItems = ref([]);
  const addClicked = ref(false);

//   const containsublist = ref(false);
const containsublist = ref(props.containsublist);
  const visible = ref(false);
  const listItemName = ref(props.editableItem.title);

  watch(() => props.editableItem, (newVal) => {
    listItemName.value = newVal.title;
  });

  const handleAdd = () => {
    addClicked.value = true;
    const items = sublistItem.value.split(/[\n,]+/)
                .map(item => item.trim())
                .filter(item => item !== '')
                .map(item => ({ name: item }));
    
    sublistItems.value = sublistItems.value.concat(items);
    
};

  const handleEditItem = () => {
    addClicked.value = true;
  
    if (sublistItems.value.length > 0){
        sublistItems.value = sublistItems.value.map((item, index) => {
            return { 
              id: index,
              title: item.name,
              isHovered: false,
              level: props.editableItem?.level + 1,
            }
        });
    

    const editedData = {
        'id':props.editableItem.id,
        'title':listItemName.value,
        'sublists':sublistItems.value,
    };

    emit('editItem',editedData)

    listItemName.value = '';
    sublistItem.value = '';
    sublistItems.value = [];
    containsublist.value = false;

    emit('cancel');
    };

  };

  const deleteItem = (data) => {
    sublistItems.value = sublistItems.value.filter(item => item.name !== data.name);
  };

  const emitOpenCreateListModal = () => {
    containsublist.value = false; 
    emit('openCreateListModal', props.editableItem); 
};

 const onRowReorder = (event) => {
    sublistItems.value = event.value;
  };
</script>
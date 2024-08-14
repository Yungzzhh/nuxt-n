<template>
  <div class="container mx-auto  flex">
    <!-- cardList -->
    <div class="w-2/3 mr-20">
      <div class=" bg-bluegray h-[calc(100vh-10rem)]
     overflow-y-auto rounded-2xl  p-4 ">
        <template v-if="cards.length">
          <div class="flex flex-wrap gap-4">
            <div v-for="card in cards" :key="card.name"
              class="w-280px h-max p-4 border border-coolGray rounded-lg bg-white shadow-2xl ">
              <UForm :validate="validateCard" :state="card" class="space-y-4" ref="formRef">
                <UFormGroup label="名称" name="name">
                  <UInput v-model="card.name" />
                </UFormGroup>

                <UFormGroup label="描述" name="description">
                  <UTextarea v-model="card.description" resize type="description" />
                </UFormGroup>

                <UFormGroup label="方式" name="cookingMethod">
                  <USelectMenu v-model="card.cookingMethod" :options="cookingMethods" clearable multiple
                    value-attribute="value" option-attribute="label" />
                </UFormGroup>

                <UFormGroup label="肉类" name="meatType">
                  <USelectMenu v-model="card.meatType" :options="meatTypes" multiple value-attribute="value"
                    option-attribute="label" />
                </UFormGroup>
              </UForm>
            </div>
          </div>
        </template>
        <!-- add -->
        <div
          class="w-200px h-32 border border-dashed border-gray-300 rounded-lg flex justify-center items-center  hover:cursor-pointer"
          :class="{ 'mt-8': cards.length }" @click="add">
          <div class="i-icon-park-solid:add-one text-white w-36px h-36px"></div>
        </div>
      </div>
      <div v-if="cards.length" class="w-full flex flex-justify-end mt-4">
        <UButton type="submit" @click="triggerValidation">
          Submit
        </UButton>
      </div>
    </div>
    <!-- codeInput -->
    <div class="w-1/3">
      <JsonEditor v-model="jsonInput" />
      <UButton label="Show toast" @click="parseJson" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import JsonEditor from '~/components/JsonEditor.vue'
import type { FormError, } from '#ui/types'
type CookingMethod = "STIR_FRY" | "STEAM" | "BRAISE" | "FRY" | "SALAD" | "ROAST";
type MeatType = "BEEF" | "PORK" | "LAMB" | "CHICKEN" | "SEAFOOD";

interface Card {
  name: string;
  description: string;
  cookingMethod?: CookingMethod[];
  meatType?: MeatType[];
}

const cookingMethods = [
  { "value": "STIR_FRY", "label": "炒" },
  { "value": "STEAM", "label": "蒸" },
  { "value": "BRAISE", "label": "焖" },
  { "value": "FRY", "label": "炸" },
  { "value": "SALAD", "label": "凉拌" },
  { "value": "ROAST", "label": "烤" }
]

const meatTypes = [
  { "value": "BEEF", "label": "牛肉" },
  { "value": "PORK", "label": "猪肉" },
  { "value": "LAMB", "label": "羊肉" },
  { "value": "CHICKEN", "label": "鸡肉" },
  { "value": "SEAFOOD", "label": "海鲜" }
]
const cards = ref<Card[]>([]);
const add = () => {
  cards.value.push({
    name: '',
    description: '',
    cookingMethod: [],
    meatType: []
  })
}

const formRef = ref(null)
const triggerValidation = () => {
  console.log(formRef.value);

  if (formRef.value) {
    (formRef.value as any).map((form: any) => {
      form.validate()
    })
  }
}

const validateCard = (state: Card): FormError[] => {
  const errors = []
  if (!state.name) errors.push({ path: 'name', message: 'Required' })
  if (!state.description) errors.push({ path: 'description', message: 'Required' })
  if (!state.cookingMethod?.length) errors.push({ path: 'cookingMethod', message: 'Required' })
  if (!state.meatType?.length) errors.push({ path: 'meatType', message: 'Required' })
  return errors
}

const jsonInput = ref('')
const toast = useToast()
const parseJson = () => {
  toast.add({ title: ' error.message ' })
  try {
    const parsedData = JSON.parse(jsonInput.value)
    if (Array.isArray(parsedData)) {
      cards.value = parsedData
    } else {
      cards.value = [parsedData]
    }
  } catch (error: any) {
    console.log(error.message);
  }
}
</script>
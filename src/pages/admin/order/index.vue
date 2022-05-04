<script setup>
import {onValue, ref as firebaseRef, set, update} from 'firebase/database';
import {database} from "../../../firebase/firebase";
import {computed, reactive, ref, watch} from "vue";
import app from "../../../main";
import {useToast} from "vue-toast-notification";


const productRef = firebaseRef(database, 'orders');

const orders = ref([]);

// const status = ref([
//   {
//     value: 'PENDING',
//     label: 'Chờ xác nhận'
//   },
//   {
//     value: 'PROGRESS',
//     label: 'Tiến hàng giao hàng'
//   },
//   {
//     value: 'DONE',
//     label: 'Xác nhận đơn hàng',
//   }
// ])

const status = computed(() => {
  return orders.value.map(item => {
    return [
      {
        value: 'PENDING',
        label: 'Wait for confirmation',
        disabled: item.status === 'PROGRESS' || item.status === 'DONE'
      },
      {
        value: 'PROGRESS',
        label: 'Delivery of goods',
        // disabled: item.status === 'DONE'
      },
      {
        value: 'DONE',
        label: 'Order confirmation',
      }
    ]
  })
})


const isLoaded = ref(false);

const toast = useToast();

onValue(productRef, snapshot => {
  const val = snapshot.val();

  orders.value = Object.keys(val).map(key => ({
    id: key,
    ...val[key]
  }));

})

watch(orders, function (newValue, oldValue) {

  if (!isLoaded.value) {
    isLoaded.value = true;
    return;
  }
  for (let i = 0; i < newValue.length; i++) {

    update(firebaseRef(database, `/orders/${newValue[i].id}`), {
      status: newValue[i].status
    })
  }
  // this.$toast.success("Cập nhật trạng thái đơn hàng thành công")


}, {
  deep: true
})

const handleStatusSuccess = () => {
  toast.success("Order status update successful")
}



</script>

<template>
  <div>
    <n-table>
      <thead>
      <tr>
        <th>Name</th>
        <th>Phone</th>
        <th>Address</th>
        <th>Product</th>
        <th>Status</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(item,index) in orders" :key="item.id">
        <td>{{ item.information.username }}</td>
        <td>{{ item.information.phone }}</td>
        <td>{{ item.information.address }}</td>
        <td>
          <div v-for="product in item.products" :key="product.id">{{ product.name }}</div>
        </td>
        <td>
          <n-select :options="status[index]" v-model:value="item.status" :on-update:show="handleStatusSuccess"/>
        </td>

      </tr>
      </tbody>
    </n-table>
  </div>
</template>


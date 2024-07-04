document.addEventListener("DOMContentLoaded", function() {
    const itemName = document.getElementById('itemName');
    const desc = document.getElementById('desc');
    const price = document.getElementById('price');
    const qnty = document.getElementById('qnty');
    const itemList = document.getElementById('itemList');

    const url = 'https://crudcrud.com/api/a771f9432a9c4f34830d3a5cf33af33f/store';

    let data = [];
    axios.get(url)
        .then((res)=>{
            data = res.data
            console.log(data);
            getData();
        })
        .catch((err)=>console.log(err));

    getData = () =>{
        itemList.innerHTML = '';
        for(let i=0;i<data.length;i++){
            const li = document.createElement('li');
            li.textContent = `Item Name: ${data[i].ItemName}, Description: ${data[i].Description}, Price: ${data[i].Price}, Quantity: ${data[i].Quantity}`;
            itemList.appendChild(li);

            const btn = document.createElement('button');
            btn.textContent = 'BUY 1';
            btn.addEventListener('click', function() {
                buy(data[i], 1);
            });
            li.appendChild(btn);

            const btn1 = document.createElement('button');
            btn1.textContent = 'BUY 2';
            btn1.addEventListener('click', function() {
                buy(data[i], 2);
            });
            li.appendChild(btn1);

            const btn2 = document.createElement('button');
            btn2.textContent = 'BUY 3';
            btn2.addEventListener('click', function() {
                buy(data[i], 3);
            });
            li.appendChild(btn2);
        }
        
    }
    

    function buy(data,qnty){
        if(data.Quantity > qnty){
            axios.put(url+'/'+data._id,{
                'ItemName': data.ItemName,
                'Description': data.Description,
                'Price': data.Price,
                'Quantity': data.Quantity - qnty
            })
            .then((res)=>{
                    axios.get(url)
                        .then((res) => {
                            data = res.data;
                            getData();
                        })
                        .catch((err) => console.log(err));
            })
            .catch((err)=>console.log(err));
        }
        
    }
    

    document.getElementById("myBtn").addEventListener("click", function(event) {
        event.preventDefault();

        axios.post(url,{
            'ItemName': itemName.value,
            'Description': desc.value,
            'Price': price.value,
            'Quantity': qnty.value
        })
        .then((res)=>console.log(res))
        .catch((err)=>console.log(err));

        itemName.value = '';
        desc.value = '';
        price.value = '';
        qnty.value = '';
    });
})
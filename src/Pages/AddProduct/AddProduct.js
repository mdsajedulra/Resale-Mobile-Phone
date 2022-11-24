import React, { useContext } from 'react';
import toast from 'react-hot-toast';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
const addedDate = new Date();
const AddProduct = () => {
    const { user } = useContext(AuthContext);
    const handleForm = event => {
        event.preventDefault()
        const form = event.target;
        const product = {
            name: form.name.value,
            category: form.brand.value,
            picture: form.pictureURL.value,
            location: form.location.value,
            resalePrice: form.saleingprice.value,
            usesTime: form.howLongUsed.value,
            number: form.number.value,
            purcheasedate: form.purcheasedate.value,
            postTime: addedDate,
            sellerName: user?.displayName,
            sellerPhoto: user?.photoURL,
        }
        fetch('http://localhost:5000/addproduct', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(product)
        })
            .then(res => res.json())
            .then(data => {
                if (data.acknowledged === true) {
                    toast.success('Your product added successfully')
                }
            })
    }

    return (
        <form onSubmit={handleForm} className="form-control w-full ">
            <h1 className="text-center text-4xl font-semibold">Add your second hand Mobile</h1>
            <div>
                <label className="label">
                    <span className="label-text">Product name</span>
                </label>
                <input required name='name' type="text" placeholder="Product name" className="input input-bordered w-full " />
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Brand Name</span>
                </label>
                <select name='brand' className="select select-bordered w-full">
                    <option value="Samsung">Samsung</option>
                    <option value="IPhone">IPhone</option>
                    <option value="Xioami">Xioami</option>
                </select>
            </div>

            <div>
                <label className="label">
                    <span className="label-text">Location</span>
                </label>
                <input required name='location' type="text" placeholder="Location" className="input input-bordered w-full " />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Picture URL</span>
                </label>
                <input required name='pictureURL' type="text" placeholder="Phone Picture" className="input input-bordered w-full " />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Buying Price</span>
                </label>
                <input required name='buyingprice' type="text" placeholder="Buying Price" className="input input-bordered w-full " />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Selling Price</span>
                </label>
                <input required name='saleingprice' type="text" placeholder="Selling Price" className="input input-bordered w-full " />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Mobile Number</span>
                </label>
                <input required name='number' type="text" placeholder="Mobile Number" className="input input-bordered w-full " />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Description</span>
                </label>
                <input required name='description' type="text" placeholder="Description" className="input input-bordered w-full " />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">Date of  Purchease</span>
                </label>
                <input required name='purcheasedate' type="date" placeholder="Year of  Purchease" className="input input-bordered w-full " />
            </div>
            <div>
                <label className="label">
                    <span className="label-text">How long used</span>
                </label>
                <input required name='howLongUsed' type="text" placeholder="How long used" className="input input-bordered w-full " />
            </div>
            <br />
            <button type='submit' className="btn btn-primary">submit</button>
        </form>
    );
};

export default AddProduct;
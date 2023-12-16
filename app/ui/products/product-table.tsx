import { fetchProducts } from '@app/lib/data';
import { DeleteProduct } from '../invoices/buttons';
import { formatCurrency } from '@app/lib/utils';

const ProductTable = async () => {
    const products = await fetchProducts()

  return (
    <table className='mt-10 min-w-full text-gray-900'>
        <thead className='rounded-md bg-gray-50 text-left text-sm font-normal'>
           <tr>
            <th scope="col" className="px-4 py-5 font-medium sm:pl-6">Product</th>
            <th scope="col" className="px-3 py-5 font-medium">Price</th>
            </tr> 
        </thead>
        <tbody className="bg-white">
            {products?.map((product) => (
                <tr key={product.id}
                className="w-fulw-full border-b py-3 text-sm last-of-type:border-none [&:first-child>td:first-child]:rounded-tl-lg [&:first-child>td:last-child]:rounded-tr-lg [&:last-child>td:first-child]:rounded-bl-lg [&:last-child>td:last-child]:rounded-br-lg">
                   <td className="whitespace-nowrap bg-white px-4 py-5 text-sm">
                    {product.name}
                    </td>
                    <td className='whitespace-nowrap bg-white px-4 py-5 text-sm'>
                    {formatCurrency(product.price)}
                    </td> 
                    <td>
                        <DeleteProduct id={product.id}/>
                    </td>
                </tr>
            ))}
        </tbody>
    </table>
  )
}

export default ProductTable
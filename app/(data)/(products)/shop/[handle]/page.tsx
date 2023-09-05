
import { apiUrl } from '../../../../global-settings.js';
import { notFound } from 'next/navigation';
import ProductSingle from "../../../../templates/ProductSingle";
import OnLoadScripts from "../../../../components/OnLoadScripts";

async function getAllProducts() {
  const res = await fetch(`https://the-kt-team.myshopify.com/products.json`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN!,
    },
    next: { revalidate: 60 }
  });
  if (!res.ok) {
    throw Error(res.statusText);
  } else {
    return res.json();
  }
}

async function getSingleProduct(handle: any) {
    const res = await fetch(`https://the-kt-team.myshopify.com/products/${handle}.json/`, {
    headers: {
      'Content-Type': 'application/json',
      'X-Shopify-Access-Token': process.env.SHOPIFY_REST_API_ACCESS_TOKEN!,
    },
    next: { revalidate: 60 }
    });
      if (!res.ok) {
        throw Error(res.statusText);
      } else {
        return res.json();
      }
  }

export default async function Page({params: { handle } }:any) {

  const _product = getSingleProduct(handle);
  const product = await _product;

  return (
    <>
      <ProductSingle productData={product.product} />
      <OnLoadScripts productData={product.product} />
    </>
  );

  
}

export async function generateStaticParams() {
  const _products = getAllProducts();
  const products = await _products;
  return products.products.map((productSing: any) => ({ 
    handle: productSing.handle
  }));
}
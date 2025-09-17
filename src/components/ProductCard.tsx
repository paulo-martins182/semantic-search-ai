import { Product } from "@/types/product_types";
import {
  FaStar,
  FaRegStar,
  FaCheckCircle,
  FaTimesCircle,
  FaTag,
} from "react-icons/fa";
import { MdOutlineCategory } from "react-icons/md";
import { TbBrandShopee } from "react-icons/tb"; // exemplo de ícone de marca
import { BiMoney } from "react-icons/bi";

export interface CardProductTypes {
  product: Product;
}

export const ProductCard = ({ product }: CardProductTypes) => {
  return (
    <div className="w-80 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all p-5 flex flex-col">
      {/* Imagem */}
      <div className="w-full h-48 flex items-center justify-center bg-gray-100 rounded-xl overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          className="object-contain h-full w-full hover:scale-105 transition-transform"
        />
      </div>

      {/* Conteúdo */}
      <div className="mt-4 flex flex-col flex-1">
        <h2 className="text-xl font-semibold text-gray-900 line-clamp-1">
          {product.name}
        </h2>
        <p className="text-sm text-gray-500 line-clamp-2">
          {product.description}
        </p>

        {/* Preço */}
        <div className="flex items-center gap-2 mt-3 text-green-600">
          <BiMoney size={18} />
          <span className="text-2xl font-bold">
            R$ {product.price.toFixed(2)}
          </span>
        </div>

        {/* Categoria e Marca */}
        <div className="flex items-center gap-4 mt-2 text-sm text-gray-600">
          <span className="flex items-center gap-1">
            <MdOutlineCategory size={16} /> {product.category}
          </span>
          <span className="flex items-center gap-1">
            <TbBrandShopee size={16} /> {product.brand}
          </span>
        </div>

        {/* Rating */}
        <div className="flex items-center mt-2 text-yellow-400">
          {Array.from({ length: 5 }).map((_, i) =>
            i < product.rating ? (
              <FaStar key={i} size={16} />
            ) : (
              <FaRegStar key={i} size={16} className="text-gray-300" />
            )
          )}
        </div>

        {/* Cores */}
        {/* <div className="flex items-center gap-2 mt-3">
          {product.colors.map((color, i) => (
            <span
              key={i}
              className="w-6 h-6 rounded-full border border-gray-300"
              style={{ backgroundColor: color }}
            />
          ))}
        </div> */}

        {/* Features */}
        <ul className="mt-3 text-sm text-gray-700 space-y-1">
          {product.features.slice(0, 3).map((feature, i) => (
            <li key={i} className="flex items-center gap-2">
              <FaTag size={14} className="text-gray-400" /> {feature}
            </li>
          ))}
          {product.features.length > 3 && (
            <li className="text-gray-500 text-xs">
              +{product.features.length - 3} mais...
            </li>
          )}
        </ul>

        {/* Estoque */}
        <div className="mt-auto pt-4">
          {product.inStock ? (
            <span className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-green-700 bg-green-100 rounded-full">
              <FaCheckCircle /> Em estoque
            </span>
          ) : (
            <span className="flex items-center gap-2 px-3 py-1 text-sm font-medium text-red-700 bg-red-100 rounded-full">
              <FaTimesCircle /> Esgotado
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

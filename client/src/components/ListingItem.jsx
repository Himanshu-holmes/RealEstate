import { Link } from "react-router-dom";
import { MdLocationOn } from "react-icons/md";
export default function ListingItem({ listing }) {
  return (
    <div className=" bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden w-full sm:w-[330px]">
      <Link to={`/listing/${listing._id}`}>
        <img
          className="h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300"
          src={listing.imageUrls[0] || "https://images.pexels.com/photos/7578984/pexels-photo-7578984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"}
          alt="listing cover"
        />
        <div className="p-3 flex flex-col gap-2">
          <p className=" text-lg truncate font-semibold text-slate-700">
            {listing.name}
          </p>
          <div className="flex items-center gap-1">
            <MdLocationOn className="h-4 w-4 text-green-700" />
            <p className=" text-sm text-slate-700 truncate w-full">
              {listing.address}
            </p>
          </div>
          <p className="text-sm text-gray-600 line-clamp-2">
            {listing.description}
          </p>

          <p className=" text-slate-500 mt-2 font-semibold ">
            Rs
            {listing.offer
              ? listing.discountedPrice.toLocaleString("en-IN")
              : listing.regularPrice.toLocaleString("en-IN")}
            {listing.type === "rent" && " / month"}
          </p>
          <div className=" text-slate-700 flex gap-4">
            <div className=" font-bold text-xs ">
              {listing.bedrooms > 1
                ? `${listing.bedrooms} beds`
                : `${listing.bedrooms} bed`}
            </div>
            <div className=" font-bold text-xs ">
              {listing.bathrooms > 1
                ? `${listing.bathrooms} bathrooms`
                : `${listing.bathrooms} bathroom`}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

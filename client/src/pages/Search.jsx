import { set } from "mongoose";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ListingItem from "../components/ListingItem";

export default function Search() {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const[listings, setListings] = useState([]);
  const [sidebardata, setSidebarData] = useState({
    searchTerm: "",
    type: "all",
    parking: "",
    furnished: false,
    offer: false,
    sort: "created_at",
    order: "desc",
  });
console.log(listings)
  useEffect(()=>{
    const urlparams = new URLSearchParams(location.search);
    const searchTermFromUrl = urlparams.get('searchTerm');
    const typefromUrl = urlparams.get('type');
    const parkingFromUrl = urlparams.get('parking');
    const furnishedFromUrl = urlparams.get('furnished');
    const offerFromUrl = urlparams.get('offer');
    const sortFromUrl = urlparams.get('sort');
    const orderFromUrl = urlparams.get('order');

    if(searchTermFromUrl || typefromUrl || parkingFromUrl || furnishedFromUrl || offerFromUrl || sortFromUrl || orderFromUrl) {
        setSidebarData({
            searchTerm: searchTermFromUrl || "",
            type: typefromUrl || "all",
            parking: parkingFromUrl === 'true' ? true : false,
            furnished: furnishedFromUrl === 'true' ? true : false,
            offer: offerFromUrl === 'true' ? true : false,
            sort: sortFromUrl || "created_at",
            order: orderFromUrl || "desc",

        });
    }

    const fetchListings = async () => {
       setLoading(true);
       const searchQuery = urlparams.toString();
       const res = await fetch(`/api/listing/get?${searchQuery}`);
         const data = await res.json();
         setListings(data);
         setLoading(false);

    }

    fetchListings();


  }, [location.search])

  const handleChange = (e) => {
    if (
      e.target.id === "all" ||
      e.target.id === "rent" ||
      e.target.id === "sale"
    ) {
      setSidebarData({ ...sidebardata, type: e.target.id });
    }

    if (e.target.id === "searchTerm") {
      setSidebarData({ ...sidebardata, searchTerm: e.target.value });
    }
    if (
      e.target.id === "parking" ||
      e.target.id === "furnished" ||
      e.target.id === "offer"
    ) {
      setSidebarData({
        ...sidebardata,
        [e.target.id]:
          e.target.checked || e.target.checked === "true" ? true : false,
      });
    }

    if (e.target.id === "sort_order") {
      const sort = e.target.value.split("_")[0] || "created_at";
      const order = e.target.value.split("_")[1] || "desc";
      setSidebarData({ ...sidebardata, sort, order });
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const urlparams = new URLSearchParams();
    urlparams.set("searchTerm", sidebardata.searchTerm);
    urlparams.set("type", sidebardata.type);
    urlparams.set("parking", sidebardata.parking);
    urlparams.set("furnished", sidebardata.furnished);
    urlparams.set("offer", sidebardata.offer);
    urlparams.set("sort", sidebardata.sort);
    urlparams.set("order", sidebardata.order);
    const searchQuery = urlparams.toString();
    navigate(`/search?${searchQuery}`)
  };

  useEffect(()=>{
    const urlparams = new URLSearchParams(location.search);

  })

  return (
    <div className=" flex flex-col md:flex-row">
      <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
        <form className=" flex flex-col gap-8" onSubmit={handleSubmit}>
          <div className="flex items-center gap-2">
            <label className=" whitespace-nowrap font-semibold">
              Search Term:
            </label>
            <input
              type="text"
              placeholder="Search..."
              id="searchTerm"
              className="border rounded-lg p-3 w-full"
              value={sidebardata.searchTerm}
              onChange={handleChange}
            />
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Type:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="all"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "all"}
              />
              <span>Rent & Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="rent"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "rent"}
              />
              <span>Rent</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="sale"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.type === "sale"}
              />
              <span>Sale</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="offer"
                className="w-5"
                onChange={sidebardata.offer}
              />
              <span>Offer</span>
            </div>
          </div>
          <div className="flex gap-2 flex-wrap items-center">
            <label className="font-semibold">Amenities:</label>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="parking"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.parking}
              />
              <span>Parking</span>
            </div>
            <div className="flex gap-2">
              <input
                type="checkbox"
                id="furnished"
                className="w-5"
                onChange={handleChange}
                checked={sidebardata.furnished}
              />
              <span>Furnished</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <label className="font-semibold">Sort:</label>
            <select
              id="sort_order"
              onChange={handleChange}
              defaultValue={"created_at_desc"}
              className="border rounded-lg p-3"
            >
              <option value="regularPrice_desc"> Price high to low</option>
              <option value="regularPrice_asc"> Price low to high</option>
              <option value="createdAt_desc">Latest</option>
              <option value="createdAt_asc">oldest</option>
            </select>
          </div>
          <button className=" bg-slate-700 text-white rounded-lg uppercase p-3 hover:opacity-95">
            Search
          </button>
        </form>
      </div>
      <div className="flex-1">
        <h1 className="text-3xl font-semibold border-b p-3 text-slate-700 mt-5">
          Listing Results:
        </h1>
        <div className=" p-7 flex flex-wrap gap-4">
            {!loading && listings.length === 0 &&  (
                <p className="text-xl text-slate-700 "> No listing found!</p>
            )}
            {
                loading && (
                    <p className="text-xl text-slate-700 text-center w-full"> Loading...</p>
                
                )
            }

            {
                !loading && listings && listings.map((listing)=>(
                    <ListingItem key={listing._id} listing={listing}/>
                ))
            }
        </div>
      </div>
    </div>
  );
}

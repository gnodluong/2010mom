// Ảnh dựng sẵn: đầu hoa (hồng, mẫu đơn, ly, cúc mâm xôi, baby) và mây
const flowerFiles = import.meta.glob("../assets/flowers/*.webp", { eager: true, import: "default" });
const cloudFiles = import.meta.glob("../assets/clouds/cloud-*.webp", { eager: true, import: "default" });
import wisps from "../assets/clouds/wisps.webp";

const byPrefix = (files, prefix) =>
  Object.keys(files)
    .filter((k) => k.split("/").pop().startsWith(prefix))
    .sort()
    .map((k) => files[k]);

export const HEADS = {
  rose: byPrefix(flowerFiles, "rose-"),
  peony: byPrefix(flowerFiles, "peony-"),
  lily: byPrefix(flowerFiles, "lily-"),
  mum: byPrefix(flowerFiles, "mum-"),
  baby: byPrefix(flowerFiles, "baby-"),
};

export const CLOUDS = byPrefix(cloudFiles, "cloud-");
export const WISPS = wisps;

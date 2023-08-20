export const getData = (ctx: any, activeIndex: any) => {
  if (!ctx?.outfits) return [];

  let data: any[] = [];

  switch (activeIndex) {
    case 0:
      data =
        ctx?.outfits?.top &&
        ctx?.outfits?.top?.map((item: any, index: number) => {
          return item[0];
        });
      return data;
    case 1:
      data =
        ctx?.outfits?.bottom &&
        ctx?.outfits?.bottom?.map((item: any, index: number) => {
          return item[0];
        });
      return data;
    case 2:
      data =
        ctx?.outfits?.shoes &&
        ctx?.outfits?.shoes?.map((item: any, index: number) => {
          return item[0];
        });
      return data;
  }
  return [];
};

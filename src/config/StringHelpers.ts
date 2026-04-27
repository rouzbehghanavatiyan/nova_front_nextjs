export default class StringHelpers {
  static baseURL: string | undefined = process.env.NEXT_PUBLIC_IMAGES;

  static getProfile = (data: any, code?: string | number) => {
    return `${StringHelpers.baseURL}/${data?.attachmentType}/${code}${data?.ext}`;
  };
  static formatPrice(value: string | number): string {
    if (value === null || value === undefined || value === "") return "";

    let str = String(value);

    str = str.replace(/[۰-۹]/g, (d) => "۰۱۲۳۴۵۶۷۸۹".indexOf(d).toString());
    str = str.replace(/[٠-٩]/g, (d) => "٠١٢٣٤٥٦٧٨٩".indexOf(d).toString());

    str = str.replace(/[^\d]/g, "");

    if (str === "") return "";

    return str.replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }
}

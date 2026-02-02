export default class StringHelpers {
  static baseURL: string | undefined = process.env.NEXT_PUBLIC_IMAGES;

  static getProfile = (data: any, code?: string | number) => {
    
    return `${StringHelpers.baseURL}/${data?.attachmentType}/${code}${data?.ext}`;
  };
}

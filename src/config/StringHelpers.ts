export default class StringHelpers {
  static baseURL: string | undefined = process.env.NEXT_PUBLIC_NEST_BASE_URI;

  static getProfile = (data: any) => {
    return `${StringHelpers.baseURL}/${data?.attachmentType}/${data?.fileName}${data?.ext}`;
  };
}

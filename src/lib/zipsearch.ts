export type ZipsearchResult = {
  status: number; //ステータス	正常時は 200、エラー発生時にはエラーコードが返される。
  message: string; //メッセージ	エラー発生時に、エラーの内容が返される。
  results: {
    zipcode: string; //郵便番号	7桁の郵便番号。ハイフンなし。
    prefcode: string; //都道府県コード	JIS X 0401 に定められた2桁の都道府県コード。
    address1: string; //都道府県名
    address2: string; //市区町村名
    address3: string; //町域名
    kana1: string; //都道府県名カナ
    kana2: string; //市区町村名カナ
    kana3: string; //町域名カナ
  }[];
};
export async function zipsearch(zipcode: string): Promise<ZipsearchResult> {
  const r = await fetch(
    `https://zipcloud.ibsnet.co.jp/api/search?zipcode=${zipcode}`
  );
  return await r.json();
}

import {
  Key,
  ReactElement,
  JSXElementConstructor,
  ReactNode,
  ReactPortal,
} from "react";

export function TabPembayaran({
  total,
  metodePembayaran,
  selected,
  onSelect,
}: any) {
  return (
    <div className="space-y-4">
      <h2 className="font-semibold">Metode Pembayaran</h2>

      {metodePembayaran.map(
        (m: {
          id: Key | null | undefined;
          metode_pembayaran:
            | string
            | number
            | bigint
            | boolean
            | ReactElement<unknown, string | JSXElementConstructor<any>>
            | Iterable<ReactNode>
            | ReactPortal
            | Promise<
                | string
                | number
                | bigint
                | boolean
                | ReactPortal
                | ReactElement<unknown, string | JSXElementConstructor<any>>
                | Iterable<ReactNode>
                | null
                | undefined
              >
            | null
            | undefined;
          detail_jenis_pembayarans: {
            no_rek:
              | string
              | number
              | bigint
              | boolean
              | ReactElement<unknown, string | JSXElementConstructor<any>>
              | Iterable<ReactNode>
              | ReactPortal
              | Promise<
                  | string
                  | number
                  | bigint
                  | boolean
                  | ReactPortal
                  | ReactElement<unknown, string | JSXElementConstructor<any>>
                  | Iterable<ReactNode>
                  | null
                  | undefined
                >
              | null
              | undefined;
          }[];
        }) => (
          <button
            key={m.id}
            className={`border p-3 rounded-md w-full text-left ${
              selected === m.id ? "border-primary" : ""
            }`}
            onClick={() => onSelect(m.id)}
          >
            <div className="font-semibold">{m.metode_pembayaran}</div>
            <div className="text-sm text-muted-foreground">
              {m.detail_jenis_pembayarans[0]?.no_rek}
            </div>
          </button>
        ),
      )}
    </div>
  );
}

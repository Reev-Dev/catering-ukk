import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Image from "next/image";

export default function PesananNoResiPage() {
  return (
    <div className="mx-auto max-w-5xl px-6 py-6">
      <div className="grid grid-cols-4 gap-4">
        <div className="col-span-3">
          <Card>
            <CardHeader className="flex justify-between items-center">
              <CardTitle>Order Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <Card className="py-4 gap-3">
                <CardHeader className="flex justify-between items-center px-4">
                  <div className="flex items-center font-bold gap-2">
                    <Image src="/logo.ico" alt="logo" width={25} height={25} />
                    Catering-in
                  </div>
                  <h5 className="text-sm font-medium">Order ORD0897</h5>
                </CardHeader>
                <CardContent className="px-4">
                  <div className="flex justify-between">
                    <div className="text-xs">
                      Jl. Raya Solo, Kebun Sawit
                      <br />
                      Indonesia
                      <br />
                      +62 812-3456-7890
                    </div>
                    <div className="space-y-1 text-xs">
                      <h4>Date Issued : 13 Feb 2026</h4>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <div className="grid gap-2">
                <h2 className="text-xs font-medium">Order to:</h2>
                <h4 className="text-xs text-muted-foreground">
                  John Doe
                  <br />
                  +62 812-3456-7890
                  <br />
                  johndoe@gmail.com
                </h4>
              </div>
              <div className="flex my-4">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-auto text-xs">PAKET</TableHead>
                      <TableHead className="w-auto text-xs">
                        DESKRIPSI
                      </TableHead>
                      <TableHead className="w-18 text-xs">
                        QTY (PAKET)
                      </TableHead>
                      <TableHead className="w-28 text-xs">
                        HARGA (PAKET)
                      </TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className="text-xs font-medium">
                    <TableRow>
                      <TableCell className="truncate max-w-30">
                        Paket nasi ayam
                      </TableCell>
                      <TableCell className="truncate max-w-48">
                        Nasi pake ayam pake oadjabdvjbacsklnushijklnacsjklznm
                      </TableCell>
                      <TableCell>5</TableCell>
                      <TableCell>Rp300.000</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </div>

              <div className="flex justify-between">
                <div className="flex flex-col gap-1">
                  <h2 className="text-xs font-medium">
                    Admin:
                    <span className="text-muted-foreground"> Admin 12</span>
                  </h2>
                  <h2 className="text-xs font-medium text-muted-foreground">
                    Terima kasih sudah belanja di Catering-in
                  </h2>
                </div>
                <div className="grid w-36 text-xs font-medium">
                  <div className="flex justify-between">
                    <div className="text-muted-foreground font-normal">
                      Subtotal:
                    </div>
                    <div>Rp 1.500.000</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-muted-foreground font-normal">
                      Diskon:
                    </div>
                    <div>Rp 0</div>
                  </div>
                  <div className="flex justify-between">
                    <div className="text-muted-foreground font-normal">
                      Pajak:
                    </div>
                    <div>Rp 0</div>
                  </div>
                  <Separator className="my-2" />
                  <div className="flex justify-between">
                    <div className="text-muted-foreground font-normal">
                      Total:
                    </div>
                    <div>Rp 1.500.000</div>
                  </div>
                </div>
              </div>
              <Separator className="mt-6" />
              <div className="flex">
                <h3 className="text-xs font-medium">
                  Note:{" "}
                  <span className="text-muted-foreground font-normal">
                    Kami harap anda puas dengan pesanan dan pelayanan kami. Kami
                    tunggu pesanan selanjutnya. Terima kasih.
                  </span>
                </h3>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="col-span-1">
          <Card className="p-5">
            <CardFooter className="grid items-center p-0">
              <Button>Download Invoice</Button>
            </CardFooter>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Minus, Plus, RotateCcw } from "lucide-react";

const ITEMS = [
  { name: "4 Jam", price: 1600 },
  { name: "6 Jam", price: 2400 },
  { name: "12 Jam", price: 4000 },
  { name: "30 Hari", price: 45000 },
];

const formatRupiah = (value: number) =>
  new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", minimumFractionDigits: 0 }).format(value);

const Index = () => {
  const [quantities, setQuantities] = useState<number[]>([0, 0, 0, 0]);
  const [payment, setPayment] = useState("");

  const total = ITEMS.reduce((sum, item, i) => sum + item.price * quantities[i], 0);
  const paymentNum = parseInt(payment.replace(/\D/g, "")) || 0;
  const change = paymentNum - total;

  const updateQty = (index: number, delta: number) => {
    setQuantities((prev) => prev.map((q, i) => (i === index ? Math.max(0, q + delta) : q)));
  };

  const reset = () => {
    setQuantities([0, 0, 0, 0]);
    setPayment("");
  };

  return (
    <div className="min-h-screen bg-background p-4 flex flex-col items-center">
      <Card className="w-full max-w-md">
        <CardHeader className="pb-4">
          <CardTitle className="text-xl text-center">LJN - Voucher Kalkulator</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {ITEMS.map((item, i) => (
            <div key={item.name} className="p-3 rounded-lg bg-muted space-y-2">
              <div className="flex items-center justify-between">
                <div>
                  <p className="font-semibold text-foreground">{item.name}</p>
                  <p className="text-sm text-muted-foreground">{formatRupiah(item.price)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => updateQty(i, -1)}>
                    <Minus className="h-4 w-4" />
                  </Button>
                  <Input
                    type="text"
                    inputMode="numeric"
                    value={quantities[i] || ""}
                    onChange={(e) => {
                      const val = parseInt(e.target.value.replace(/\D/g, "")) || 0;
                      setQuantities((prev) => prev.map((q, j) => (j === i ? Math.max(0, val) : q)));
                    }}
                    className="w-12 h-9 text-center text-base font-bold p-0"
                  />
                  <Button variant="outline" size="icon" className="h-9 w-9 shrink-0" onClick={() => updateQty(i, 1)}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              {quantities[i] > 0 && (
                <p className="text-sm font-medium text-primary text-right">
                  = {formatRupiah(item.price * quantities[i])}
                </p>
              )}
            </div>
          ))}

          <div className="border-t pt-4 space-y-3">
            <div className="flex justify-between text-lg font-bold">
              <span className="text-foreground">Total</span>
              <span className="text-foreground">{formatRupiah(total)}</span>
            </div>

            <div>
              <label className="text-sm font-medium text-foreground mb-1 block">Uang Bayar</label>
              <Input
                type="text"
                inputMode="numeric"
                placeholder="Masukkan jumlah uang..."
                value={payment}
                onChange={(e) => setPayment(e.target.value.replace(/\D/g, ""))}
                className="text-lg h-12"
              />
            </div>

            {paymentNum > 0 && (
              <div className={`flex justify-between text-lg font-bold p-3 rounded-lg ${change >= 0 ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                <span>Kembalian</span>
                <span>{change >= 0 ? formatRupiah(change) : `Kurang ${formatRupiah(Math.abs(change))}`}</span>
              </div>
            )}

            <Button variant="outline" className="w-full h-12 text-base" onClick={reset}>
              <RotateCcw className="mr-2 h-5 w-5" />
              Reset
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Index;

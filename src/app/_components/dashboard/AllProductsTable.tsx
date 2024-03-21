// import { Button } from "@/components/ui/button";
// import { Checkbox } from "@/components/ui/checkbox";
// import {
//   Table,
//   TableBody,
//   TableCaption,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { api } from "@/trpc/react";

// export const AllProductsTable = () => {
//   const { data: products } = api.product.listAll.useQuery();

//   return (
//     <Table>
//       <TableCaption>A list of your recent invoices.</TableCaption>
//       <TableHeader>
//         <TableRow>
//           <TableHead />
//           <TableHead className="w-[100px]">Jméno</TableHead>
//           <TableHead>Cena</TableHead>
//           <TableHead>Počet</TableHead>
//           <TableHead>Celkem prodáno</TableHead>
//           <TableHead>Celkem prodáno za</TableHead>
//           <TableHead>
//             <Button
//               {...(isLoading && { disabled: true })}
//               className="flex flex-row gap-2"
//               onClick={onDeleteSelected}
//             >
//               {isLoading && <RxReload className="animate-spin" />}
//               Delete
//             </Button>
//           </TableHead>
//         </TableRow>
//       </TableHeader>
//       <TableBody>
//         {products?.map((product) => (
//           <TableRow key={product.id}>
//             <TableCell>
//               <div className="flex items-center space-x-2">
//                 <Checkbox
//                   checked={isSelectedId(product.id)}
//                   onCheckedChange={() => toggleId(product.id)}
//                   id="terms"
//                 />
//               </div>
//             </TableCell>
//             <TableCell className="font-medium">{product.name}</TableCell>
//             <TableCell>{String(product.price)}</TableCell>
//             <TableCell>{product.quantity}</TableCell>
//             <TableCell>{product.soldCount}</TableCell>
//             <TableCell>{product.soldPrice}</TableCell>
//             <TableCell>
//               <Button
//                 onClick={() => onSetEditingProduct(product)}
//                 variant="ghost"
//               >
//                 <RxPencil2 />
//               </Button>
//             </TableCell>
//           </TableRow>
//         ))}
//       </TableBody>
//     </Table>
//   );
// };

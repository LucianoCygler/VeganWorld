import * as React from "react";
import { DataGrid } from "@mui/x-data-grid";

function TableOrder({ orders }) {
	const columns = [
		{ field: "id", renderHeader: () => <strong>{"Order"}</strong>, width: 40 },
		{ field: "products", renderHeader: () => <strong>{"Products"}</strong>, width: 500 },
		{ field: "state", renderHeader: () => <strong>{"State"}</strong>, width: 130 },
		{ field: "mount", renderHeader: () => <strong>{"Mount"}</strong>, type: "number", width: 80 },
		{
			field: "direction",
			renderHeader: () => <strong>{"Direction"}</strong>,
			// description: "This column has a value getter and is not sortable.",
			// sortable: false,
			width: 160,
			// valueGetter: (params) =>
			// 	`${params.row.products || ""} ${params.row.state || ""}`,
		},
		{
			field: "dateCreate",
      renderHeader: () => <strong>{"Date Created"}</strong>,
			width: 130,
		},
	];

	const rows = orders.map((order) => {
		return {
			id: order.id,
			products: order.productos,
			state: order.estado,
			mount: order.importe,
			direction: order.direccion,
			dateCreate: order.fecha,
		};
	});
	return (
		<div style={{ height: 400, width: "90%" }}>
			<DataGrid
				rows={rows}
				columns={columns}
				initialState={{
					pagination: {
						paginationModel: { page: 0, pageSize: 5 },
					},
				}}
				pageSizeOptions={[5, 10]}
				checkboxSelection
			/>
		</div>
	);
}

export default TableOrder;

type queries = {
	page?: number
	per_page?: number
	builder?: any
}

export const Pagination = async ({
	page = 1,
	per_page = 10,
	builder,
}: queries) => {
	return builder.offset((page - 1) * per_page).limit(per_page)
}

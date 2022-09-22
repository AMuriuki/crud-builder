export function crudBuilder(baseRoute, transformUserFilters, transformEntity) {
    async function list(filters) {
        let params = transformUserFilters(filters)?.join("&");
        if (params) {
            params += "?"
        }

        const res = await fetch(`${baseRoute}${params}`);
        const res_1 = await res.json();
        return res_1.json({
            data: res_1.data.map((entity) => transformEntity(entity)),
            pagination: res_1.pagination
        });
    }

    function show(id) {
        return fetch(`${baseRoute}/${id}`);
    }

    function create(formValues) {
        return fetch(baseRoute, { method: "POST", body: formValues });
    }

    function update(id, formValues) {
        return fetch(`${baseRoute}/${id}`, { method: "PUT", body: formValues });
    }

    function remove(id) {
        return fetch(`${baseRoute}/${id}`, { method: "DELETE" });
    }

    return {
        list,
        show,
        create,
        update,
        remove
    }
}


/**
 * handle filtering of lists
 * we'll assume a users list that needs filtering
 * for example:
 * 
 * const filters = {
 *      keyword: "john",
 *      createdAt: new Date("2020-02-10")
 * }
 * 
 * modify according to your needs
 */
function transformUserFilters(filters) {
    const params = []
    if (filters.keyword) {
        params.push(`keyword=${filters.keyword}`)
    }
    if (filters.createdAt) {
        params.push(`created_at=${dateUtility.format(filters.createdAt)}`);
    }

    return params
}


/**
 * serialization & pagination
 * assuming that paginated data from the API 
 * takes the following shape:
 * 
 * {
 *       data: [] // list of entity objects
 *       pagination: {...}, pagination info
 * }
 * 
 * modify according to your needs. all you need
 * is determine how you should transform a single object
*/

function transformEntity() {

}

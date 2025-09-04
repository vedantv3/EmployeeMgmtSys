function buildFilter({ search, minSalary, maxSalary }) {
  const q = {};
  if (search) q.$text = { $search: search };
  if (minSalary !== undefined || maxSalary !== undefined) {
    q.salary = {};
    if (minSalary !== undefined) q.salary.$gte = Number(minSalary);
    if (maxSalary !== undefined) q.salary.$lte = Number(maxSalary);
  }
  return q;
}

function buildOptions({ page = 1, limit = 10, sort = '-createdAt' }) {
  page = Number(page); limit = Number(limit);
  const skip = (page - 1) * limit;
  return { skip, limit, sort, page };
}

module.exports = { buildFilter, buildOptions };

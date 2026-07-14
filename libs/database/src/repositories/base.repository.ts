export abstract class BaseRepository {
  protected getOffset(page = 1, limit = 20): number {
    return (page - 1) * limit;
  }

  protected getPaginationMeta(total: number, page = 1, limit = 20) {
    return {
      page,
      limit,
      total,
      totalPages: Math.ceil(total / limit),
    };
  }
}

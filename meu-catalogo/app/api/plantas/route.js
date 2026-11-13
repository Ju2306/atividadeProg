import { listarPlantas } from '@/lib/db';

export async function GET(request) {
  const busca = request.nextUrl.searchParams.get('q') ?? '';
  const plantas = listarPlantas(busca);

  return Response.json(plantas);
}

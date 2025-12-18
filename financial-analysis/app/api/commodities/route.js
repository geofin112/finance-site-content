import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabaseClient';

export async function GET() {
  try {
    const { data, error } = await supabase
      .from('commodities')
      .select('*')
      .eq('name', 'Crude Oil (WTI)')
      .order('created_at', { ascending: false })
      .limit(1)
      .single();

    if (error || !data) {
      return NextResponse.json(
        { error: 'Commodity data unavailable' },
        { status: 500 }
      );
    }

    return NextResponse.json({
      name: data.name,
      price: data.price,
      unit: data.unit,
      source: data.source,
      updated_at: data.created_at,
    });
  } catch (err) {
    return NextResponse.json(
      { error: 'Server error fetching commodities' },
      { status: 500 }
    );
  }
}
'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { createClient } from '@/utils/supabase/server'

export async function login(formData: FormData) {
    const supabase = await createClient()

    const data = {
        email: (formData.get('email') as string || '').trim(),
        password: formData.get('password') as string || '',
    }

    // Basic server-side validation
    if (!data.email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
        return { error: 'Please enter a valid email address.' }
    }
    if (data.password.length < 6) {
        return { error: 'Password must be at least 6 characters.' }
    }

    const { error } = await supabase.auth.signInWithPassword(data)

    if (error) {
        return { error: 'Invalid login credentials' }
    }

    revalidatePath('/admin', 'layout')
    redirect('/admin')
}

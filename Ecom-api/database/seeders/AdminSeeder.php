<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;
use Illuminate\Support\Facades\Artisan;
class AdminSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $admin = User::firstOrCreate(
            ['email' => 'admin@email.com'],
            [
                'name' => 'Super Admin',
                'password' => Hash::make('password'),
            ]
        );

        $role = Role::firstOrCreate(
            ['name' => 'super_admin', 'guard_name' => 'web']
        );

         //  // منح الدور جميع الصلاحيات من Shield
        $permissions = Permission::where('guard_name', 'web')->get();
        if ($permissions->isNotEmpty()) {
            $role->syncPermissions($permissions);
        }

        // تعيين الدور للأدمن وإزالة أي أدوار أخرى
        $admin->syncRoles([$role]);

        // Run shield:generate for admin panel and auto-confirm all prompts
        Artisan::call('shield:generate', [
            '--panel' => 'admin',
            '--all' => true,
            '--no-interaction' => true,
        ]);
    }
}

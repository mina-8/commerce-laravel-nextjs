<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\Brand;
use Illuminate\Auth\Access\HandlesAuthorization;

class BrandPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('view_any_brand');
    }

    public function view(AuthUser $authUser, Brand $brand): bool
    {
        return $authUser->can('view_brand');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('create_brand');
    }

    public function update(AuthUser $authUser, Brand $brand): bool
    {
        return $authUser->can('update_brand');
    }

    public function delete(AuthUser $authUser, Brand $brand): bool
    {
        return $authUser->can('delete_brand');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('delete_any_brand');
    }

    public function restore(AuthUser $authUser, Brand $brand): bool
    {
        return $authUser->can('restore_brand');
    }

    public function forceDelete(AuthUser $authUser, Brand $brand): bool
    {
        return $authUser->can('force_delete_brand');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('force_delete_any_brand');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('restore_any_brand');
    }

    public function replicate(AuthUser $authUser, Brand $brand): bool
    {
        return $authUser->can('replicate_brand');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('reorder_brand');
    }

}
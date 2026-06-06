<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\Inventory;
use Illuminate\Auth\Access\HandlesAuthorization;

class InventoryPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('view_any_inventory');
    }

    public function view(AuthUser $authUser, Inventory $inventory): bool
    {
        return $authUser->can('view_inventory');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('create_inventory');
    }

    public function update(AuthUser $authUser, Inventory $inventory): bool
    {
        return $authUser->can('update_inventory');
    }

    public function delete(AuthUser $authUser, Inventory $inventory): bool
    {
        return $authUser->can('delete_inventory');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('delete_any_inventory');
    }

    public function restore(AuthUser $authUser, Inventory $inventory): bool
    {
        return $authUser->can('restore_inventory');
    }

    public function forceDelete(AuthUser $authUser, Inventory $inventory): bool
    {
        return $authUser->can('force_delete_inventory');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('force_delete_any_inventory');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('restore_any_inventory');
    }

    public function replicate(AuthUser $authUser, Inventory $inventory): bool
    {
        return $authUser->can('replicate_inventory');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('reorder_inventory');
    }

}
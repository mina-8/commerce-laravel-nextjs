<?php

declare(strict_types=1);

namespace App\Policies;

use Illuminate\Foundation\Auth\User as AuthUser;
use App\Models\ProductVariant;
use Illuminate\Auth\Access\HandlesAuthorization;

class ProductVariantPolicy
{
    use HandlesAuthorization;
    
    public function viewAny(AuthUser $authUser): bool
    {
        return $authUser->can('view_any_product_variant');
    }

    public function view(AuthUser $authUser, ProductVariant $productVariant): bool
    {
        return $authUser->can('view_product_variant');
    }

    public function create(AuthUser $authUser): bool
    {
        return $authUser->can('create_product_variant');
    }

    public function update(AuthUser $authUser, ProductVariant $productVariant): bool
    {
        return $authUser->can('update_product_variant');
    }

    public function delete(AuthUser $authUser, ProductVariant $productVariant): bool
    {
        return $authUser->can('delete_product_variant');
    }

    public function deleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('delete_any_product_variant');
    }

    public function restore(AuthUser $authUser, ProductVariant $productVariant): bool
    {
        return $authUser->can('restore_product_variant');
    }

    public function forceDelete(AuthUser $authUser, ProductVariant $productVariant): bool
    {
        return $authUser->can('force_delete_product_variant');
    }

    public function forceDeleteAny(AuthUser $authUser): bool
    {
        return $authUser->can('force_delete_any_product_variant');
    }

    public function restoreAny(AuthUser $authUser): bool
    {
        return $authUser->can('restore_any_product_variant');
    }

    public function replicate(AuthUser $authUser, ProductVariant $productVariant): bool
    {
        return $authUser->can('replicate_product_variant');
    }

    public function reorder(AuthUser $authUser): bool
    {
        return $authUser->can('reorder_product_variant');
    }

}